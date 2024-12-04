const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures each username is unique
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for the password
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
