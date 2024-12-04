const Newsroom = require('../Model/newssroomModel');
const mongoose = require('mongoose');
const path = require('path');

module.exports.addNewsroomEntry = async (req, res) => {
    try {
        const { heading, title, details, excerpt, date } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required", success: false });
        }

        // Ensure all required fields are provided
        if (!excerpt || !date) {
            return res.status(400).json({ message: "Excerpt and date are required", success: false });
        }

        const newNewsroomEntry = new Newsroom({
            heading,
            title,
            details,
            excerpt,
            date,
            image: `/uploads/${req.file.filename}`,
        });

        await newNewsroomEntry.save();

        return res.status(200).json({ message: "Newsroom entry added successfully", success: true });
    } catch (error) {
        console.error('Error adding newsroom entry:', error);
        return res.status(500).json({ message: "An error occurred", success: false });
    }
};


module.exports.getAllNewsrooms = async (req, res) => {
    try {
        const newsrooms = await Newsroom.find(); // Fetch all entries
        return res.status(200).json({ newsrooms, success: true });
    } catch (error) {
        console.error('Error fetching newsrooms:', error);
        return res.status(500).json({ message: "An error occurred while fetching newsrooms", success: false });
    }
};

// Get a specific newsroom entry by ID
module.exports.getNewsroomById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }

        const newsroom = await Newsroom.findById(id);

        if (!newsroom) {
            return res.status(404).json({ message: "Newsroom item not found", success: false });
        }

        return res.status(200).json({ newsroom, success: true });
    } catch (error) {
        console.error('Error fetching newsroom by ID:', error);
        return res.status(500).json({ message: "An error occurred while fetching the newsroom", success: false });
    }
};