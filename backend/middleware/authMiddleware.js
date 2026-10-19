const jwt = require("jsonwebtoken");

/**
 * Middleware: verifyUserCookie
 * Identifies and verifies the 'jwt' authentication cookie for every action requiring JWT.
 * Attaches the verified user payload ({ _id, username, email }) to req.user.
 */
const verifyUserCookie = (req, res, next) => {
    // 1. Extract JWT from cookies
    const token = req.cookies?.jwt;

    // 2. Reject if no cookie found
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Authentication cookie missing. Please log in.",
        });
    }

    // 3. Verify token authenticity
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser; // payload contains { _id, username, email, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired session. Please log in again.",
        });
    }
};

module.exports = {
    verifyUserCookie,
    isLoggedIn: verifyUserCookie,
    userVerification: verifyUserCookie,
};
