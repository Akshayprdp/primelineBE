// models/Newsroom.js
const mongoose = require('mongoose');

const NewsroomSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Newsroom', NewsroomSchema);
