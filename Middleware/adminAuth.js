const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key"; // Ensure this matches the secret key used for signing the token

module.exports = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);

        // Check if the user has admin privileges
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};