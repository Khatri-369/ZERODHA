const jwt = require("jsonwebtoken");

/**
 * Middleware: verifyUserCookie
 * Identifies and verifies the 'jwt' authentication cookie or Authorization header for requests.
 * Attaches the verified user payload ({ _id, username, email }) to req.user.
 */
const verifyUserCookie = (req, res, next) => {
    // 1. Extract JWT from cookies or Authorization header
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization) {
        if (req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            token = req.headers.authorization;
        }
    }

    // 2. Reject if no token found
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Authentication required. Please log in.",
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

/**
 * Middleware: optionalAuth
 * Attempts to extract and verify user if token exists, but doesn't block the request if not.
 */
const optionalAuth = (req, res, next) => {
    let token = req.cookies?.jwt;
    if (!token && req.headers.authorization) {
        if (req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            token = req.headers.authorization;
        }
    }

    if (token) {
        try {
            const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedUser;
        } catch (err) {
            // Token expired or invalid, proceed as guest
        }
    }
    next();
};

module.exports = {
    verifyUserCookie,
    isLoggedIn: verifyUserCookie,
    userVerification: verifyUserCookie,
    optionalAuth,
};
