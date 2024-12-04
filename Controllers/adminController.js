const jwt = require('jsonwebtoken');
const Admin = require('../Model/adminModel'); // Adjust the path to your Admin model
const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Replace with your actual secret key

const adminLogin = async (req, res) => {
    try {
        const { adminUsername, adminPassword } = req.body;

        // Find the admin by username
        const admin = await Admin.findOne({ username: adminUsername });

        if (admin) {
            // Directly compare the provided password with the one in the database
            if (adminPassword === admin.password) {
                // Create a JWT token
                const token = jwt.sign({ id: admin._id }, secretKey, {
                    expiresIn: '1h', // Token expiry time
                });

                // Return success response with token and user info
                return res.json({
                    message: 'Login successful',
                    success: true,
                    token,
                    username: admin.username,
                    // Include additional user info if needed (e.g., Email, Phone)
                });
            } else {
                return res.json({ message: 'Incorrect password', success: false });
            }
        } else {
            return res.json({ message: 'User not found', success: false });
        }
    } catch (error) {
        console.error('Error in admin login:', error);
        return res.status(500).json({ message: 'An error occurred', success: false });
    }
};

module.exports = {
    adminLogin,
};
