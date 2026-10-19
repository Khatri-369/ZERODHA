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
const { verifyUserCookie, optionalAuth } = require("./middleware/authMiddleware");

//MIDDLEWARES
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);
        if (
            origin === "http://localhost:3000" ||
            origin === "http://localhost:3001" ||
            origin.endsWith(".onrender.com") ||
            origin.endsWith(".vercel.app") ||
            origin.endsWith(".netlify.app")
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Helper for setting JWT cookie safely across localhost and production (Render)
const setAuthCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER;
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: isProduction ? "none" : "lax",
        secure: !!isProduction,
    });
};

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

//1. ALL HOLDINGS
app.get("/allholdings", optionalAuth, async (req, res) => {
    try {
        const holdings = await HoldingModel.find({});
        res.json(holdings);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//2. ALL POSITIONS
app.get("/allpositions", optionalAuth, async (req, res) => {
    try {
        const positions = await PositionModel.find({});
        res.json(positions);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//4. ALL ORDERS
app.get("/allorders", optionalAuth, async (req, res) => {
    try {
        const orders = await OrderModel.find({}).sort({ _id: -1 });
        res.json(orders);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

//3. NEW ORDER (Creates Order AND updates Holdings with weighted average price)
app.post("/newOrder", optionalAuth, async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Stock name is required" });
        }

        const stockName = String(name).trim().toUpperCase();
        const orderQty = Math.max(1, Number(qty) || 1);
        const orderPrice = Number(price) || 0;
        const orderMode = mode ? String(mode).toUpperCase() : "BUY";

        // 1. Create and save the order in OrderModel
        let newOrder = new OrderModel({
            name: stockName,
            qty: orderQty,
            price: String(orderPrice),
            mode: orderMode,
        });
        await newOrder.save();

        // 2. Update Holdings based on BUY or SELL
        let updatedHolding = null;
        const existingHolding = await HoldingModel.findOne({ name: stockName });

        if (orderMode === "BUY") {
            if (existingHolding) {
                // Calculate new weighted average price:
                // (prevQty * prevAvg + newQty * newPrice) / (prevQty + newQty)
                const prevQty = Number(existingHolding.qty) || 0;
                const prevAvg = Number(existingHolding.avg) || 0;
                const newTotalQty = prevQty + orderQty;
                const newAvg = ((prevQty * prevAvg) + (orderQty * orderPrice)) / newTotalQty;

                existingHolding.qty = newTotalQty;
                existingHolding.avg = Number(newAvg.toFixed(2));
                existingHolding.price = orderPrice;
                const netPct = Number(((orderPrice - newAvg) / newAvg * 100).toFixed(2));
                existingHolding.net = (netPct >= 0 ? `+${netPct}%` : `${netPct}%`);
                existingHolding.isLoss = orderPrice < newAvg;

                await existingHolding.save();
                updatedHolding = existingHolding;
            } else {
                // Create brand new holding entry
                updatedHolding = new HoldingModel({
                    name: stockName,
                    qty: orderQty,
                    avg: Number(orderPrice.toFixed(2)),
                    price: orderPrice,
                    net: "+0.00%",
                    day: "+0.00%",
                    isLoss: false,
                });
                await updatedHolding.save();
            }
        } else if (orderMode === "SELL") {
            if (existingHolding) {
                const prevQty = Number(existingHolding.qty) || 0;
                const remainingQty = prevQty - orderQty;

                if (remainingQty > 0) {
                    existingHolding.qty = remainingQty;
                    existingHolding.price = orderPrice;
                    const netPct = Number(((orderPrice - existingHolding.avg) / existingHolding.avg * 100).toFixed(2));
                    existingHolding.net = (netPct >= 0 ? `+${netPct}%` : `${netPct}%`);
                    existingHolding.isLoss = orderPrice < existingHolding.avg;

                    await existingHolding.save();
                    updatedHolding = existingHolding;
                } else {
                    // Sold entire position
                    await HoldingModel.deleteOne({ _id: existingHolding._id });
                    updatedHolding = { name: stockName, qty: 0, status: "liquidated" };
                }
            }
        }

        res.status(200).json({
            success: true,
            message: "Order placed successfully!",
            order: newOrder,
            holding: updatedHolding,
        });
    } catch (err) {
        console.error("DB error in /newOrder:", err);
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

        // SAVE IN COOKIE
        setAuthCookie(res, token);

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

        // SAVE IN COOKIE
        setAuthCookie(res, token);

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
    const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER;
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: !!isProduction,
    });
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