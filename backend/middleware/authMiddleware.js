const jwt = require("jsonwebtoken");

// AUTHENTICATION MIDDLEWARE (matching AIRBNB isLoggedIn style)
const isLoggedIn = (req, res, next) => {
    let token = null;

    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "You must be logged in first!" });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = { isLoggedIn, userVerification: isLoggedIn };
