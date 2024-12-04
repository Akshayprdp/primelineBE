const CoverPic = require('../Model/coverPicModel');
const path = require('path');

module.exports.addCoverPic = async (req, res) => {
  try {
    const { heading, subheading } = req.body;

    // Check if the cover picture file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Cover picture file is required", success: false });
    }

    // Create a new cover picture entry
    const newCoverPic = new CoverPic({
      heading,
      subheading,
      coverPic: `/uploads/${req.file.filename}`, // Assuming multer is handling file uploads
    });

    // Save the new cover picture entry to the database
    await newCoverPic.save();

    return res.status(200).json({ message: "Cover picture added successfully", success: true });
  } catch (error) {
    console.error('Error adding cover picture:', error);
    return res.status(500).json({ message: "An error occurred", success: false });
  }
};

module.exports.getAllCoverPics = async (req, res) => {
  try {
    const coverPics = await CoverPic.find();
    return res.status(200).json({ coverPics, success: true });
  } catch (error) {
    console.error('Error fetching cover pictures:', error);
    return res.status(500).json({ message: "An error occurred while fetching cover pictures", success: false });
  }
};