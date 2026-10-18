require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

//MODELS
const HoldingModel = require("./model/HoldingSchema");
const PositionModel = require("./model/PositionSchema");
const OrderModel = require("./model/OrderSchema");
const UserModel = require("./model/UserSchema");

const { createSecretToken } = require("./util/secretToken");
const { isLoggedIn } = require("./middleware/authMiddleware");

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(url)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

app.get("/addHoldings", async (req, res) => {
    try {
        let tempHoldings = [
            {
                name: "BHARTIARTL",
                qty: 2,
                avg: 538.05,
                price: 541.15,
                net: "+0.58%",
                day: "+2.99%",
            },
            {
                name: "HDFCBANK",
                qty: 2,
                avg: 1383.4,
                price: 1522.35,
                net: "+10.04%",
                day: "+0.11%",
            },
            {
                name: "HINDUNILVR",
                qty: 1,
                avg: 2335.85,
                price: 2417.4,
                net: "+3.49%",
                day: "+0.21%",
            },
            {
                name: "INFY",
                qty: 1,
                avg: 1350.5,
                price: 1555.45,
                net: "+15.18%",
                day: "-1.60%",
                isLoss: true,
            },
            {
                name: "ITC",
                qty: 5,
                avg: 202.0,
                price: 207.9,
                net: "+2.92%",
                day: "+0.80%",
            },
            {
                name: "KPITTECH",
                qty: 5,
                avg: 250.3,
                price: 266.45,
                net: "+6.45%",
                day: "+3.54%",
            },
            {
                name: "M&M",
                qty: 2,
                avg: 809.9,
                price: 779.8,
                net: "-3.72%",
                day: "-0.01%",
                isLoss: true,
            },
            {
                name: "RELIANCE",
                qty: 1,
                avg: 2193.7,
                price: 2112.4,
                net: "-3.71%",
                day: "+1.44%",
                isLoss: true,
            },
            {
                name: "SBIN",
                qty: 4,
                avg: 324.35,
                price: 430.2,
                net: "+32.63%",
                day: "-0.34%",
                isLoss: true,
            },
            {
                name: "SGBMAY29",
                qty: 2,
                avg: 4727.0,
                price: 4719.0,
                net: "-0.17%",
                day: "+0.15%",
            },
            {
                name: "TATAPOWER",
                qty: 5,
                avg: 104.2,
                price: 124.15,
                net: "+19.15%",
                day: "-0.24%",
                isLoss: true,
            },
            {
                name: "TCS",
                qty: 1,
                avg: 3041.7,
                price: 3194.8,
                net: "+5.03%",
                day: "-0.25%",
                isLoss: true,
            },
            {
                name: "WIPRO",
                qty: 4,
                avg: 489.3,
                price: 577.75,
                net: "+18.08%",
                day: "+0.32%",
            },
        ];

        const count = await HoldingModel.countDocuments();
        if (count > 0) {
            return res.status(200).json({ success: true, message: "Holdings already seeded! (Count: " + count + ")" });
        }

        await HoldingModel.insertMany(tempHoldings);
        console.log("Holdings added successfully!");
        res.status(200).json({ success: true, message: "Holdings added successfully!" });
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/addPositions", async (req, res) => {
    try {
        let positions = [
            {
                product: "CNC",
                name: "EVEREADY",
                qty: 2,
                avg: 316.27,
                price: 312.35,
                net: "+0.58%",
                day: "-1.24%",
                isLoss: true,
            },
            {
                product: "CNC",
                name: "JUBLFOOD",
                qty: 1,
                avg: 3124.75,
                price: 3082.65,
                net: "+10.04%",
                day: "-1.35%",
                isLoss: true,
            },
        ];

        const count = await PositionModel.countDocuments();
        if (count > 0) {
            return res.status(200).json({ success: true, message: "Positions already seeded! (Count: " + count + ")" });
        }

        await PositionModel.insertMany(positions);
        console.log("Positions added successfully!");
        res.status(200).json({ success: true, message: "Positions added successfully!" });
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/allholdings", async (req, res) => {
    try {
        const holdings = await HoldingModel.find({});
        res.json(holdings);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/cleanDuplicateHoldings", async (req, res) => {
    try {
        const holdings = await HoldingModel.find({});
        const seen = new Set();
        const duplicates = [];

        for (const item of holdings) {
            if (seen.has(item.name)) {
                duplicates.push(item._id);
            } else {
                seen.add(item.name);
            }
        }

        if (duplicates.length > 0) {
            await HoldingModel.deleteMany({ _id: { $in: duplicates } });
        }

        const remaining = await HoldingModel.find({});
        res.json({
            success: true,
            removedCount: duplicates.length,
            remainingCount: remaining.length,
            remaining: remaining.map(h => ({ id: h._id, name: h.name }))
        });
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/allpositions", async (req, res) => {
    try {
        const positions = await PositionModel.find({});
        res.json(positions);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/newOrder", async (req, res) => {
    try {
        let newOrder = new OrderModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        });

        await newOrder.save();
        res.status(200).json({ success: true, message: "Order saved successfully!" });
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/allorders", async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json(orders);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// AUTHENTICATION ROUTES (Simplified matching AIRBNB)

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
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
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
        const { username, email, password } = req.body;
        const loginIdentifier = username || email;

        if (!loginIdentifier || !password) {
            return res.status(400).json({ success: false, message: "Username/Email and password are required" });
        }

        const user = await UserModel.findOne({
            $or: [{ username: loginIdentifier }, { email: loginIdentifier }],
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        // Compare password using bcrypt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const token = createSecretToken(user);

        // SAVE IN COOKIE (matching AIRBNB)
        res.cookie("jwt", token, {
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
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

// 4. Protected Profile Route (Using isLoggedIn middleware)
app.get("/user/profile", isLoggedIn, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 