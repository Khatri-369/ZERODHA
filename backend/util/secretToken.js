const jwt = require("jsonwebtoken");

// HELPER FUNCTION TO SIGN JWT TOKEN (7 DAYS)
const createSecretToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

module.exports = { createSecretToken };
