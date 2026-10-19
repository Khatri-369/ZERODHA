require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

//IMPORTING MODELS
const HoldingModel = require("./model/HoldingSchema");
const PositionModel = require("./model/PositionSchema");
const OrderModel = require("./model/OrderSchema");
const UserModel = require("./model/UserSchema");

const { createSecretToken } = require("./util/secretToken");
const { verifyUserCookie } = require("./middleware/authMiddleware");

//MIDDLEWARES
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        /\.onrender\.com$/
    ],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

//ROOT HEALTH ROUTE
app.get("/", (req, res) => {
    res.send("🚀 Zerodha Backend API is running successfully on Render!");
});

//DATABASE CONNECTION
mongoose.connect(url)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

//ROUTES

//1. ALL HOLDINGS (Protected)
app.get("/allholdings", verifyUserCookie, async (req, res) => {
    try {
        const holdings = await HoldingModel.find({});
        res.json(holdings);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//2. ALL POSITIONS (Protected)
app.get("/allpositions", verifyUserCookie, async (req, res) => {
    try {
        const positions = await PositionModel.find({});
        res.json(positions);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//4. ALL ORDERS (Protected)
app.get("/allorders", verifyUserCookie, async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json(orders);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//3. NEW ORDER (Protected)
app.post("/newOrder", verifyUserCookie, async (req, res) => {
    try {
        let newOrder = new OrderModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        });

        await newOrder.save();
        res.status(200).json({ success: true, message: "Order placed successfully!" });
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// AUTHENTICATION ROUTES

// 1. Signup Route
app.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newUser = new UserModel({ username, email, password });
        await newUser.save();

        const token = createSecretToken(newUser);

        // SAVE IN COOKIE (matching AIRBNB)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        res.status(201).json({
            message: "Registration successful!",
            token
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({
            success: false,
            message: err.code === 11000 ? "Username or email already exists." : err.message,
        });
    }
});

// 2. Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Compare password using bcrypt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const token = createSecretToken(user);

        // SAVE IN COOKIE (matching AIRBNB)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Login successful!"
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Login failed, please try again." });
    }
});

// 3. Logout Route
app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out successfully!" });
});

// 4. Protected Profile Route (Using verifyUserCookie middleware)
app.get("/user/profile", verifyUserCookie, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 