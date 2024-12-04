const BrandDetails = require('../Model/brandDetailsModel');
const path = require('path');
const mongoose = require('mongoose');

module.exports.addBrandDetails = async (req, res) => {
  try {
    const { name, tagline, missionStatement, coreValues } = req.body;

    // Check if the logo file is provided
    if (!req.files || !req.files.logo || !req.files.images) {
      return res.status(400).json({ message: "Logo and images files are required", success: false });
    }

    const logo = req.files.logo[0];
    const images = req.files.images;

    // Create a new brand details entry
    const newBrandDetails = new BrandDetails({
      name,
      tagline,
      missionStatement,
      coreValues: coreValues.split(','), // Assuming coreValues are sent as a comma-separated string
      logo: `/uploads/${logo.filename}`, // Assuming multer is handling file uploads
      images: images.map(image => `/uploads/${image.filename}`), // Assuming multer is handling file uploads
    });

    // Save the new brand details entry to the database
    await newBrandDetails.save();

    return res.status(200).json({ message: "Brand details added successfully", success: true });
  } catch (error) {
    console.error('Error adding brand details:', error);
    return res.status(500).json({ message: "An error occurred", success: false });
  }
};

module.exports.getAllBrandDetails = async (req, res) => {
  try {
    const brandDetails = await BrandDetails.find();
    return res.status(200).json({ brandDetails, success: true });
  } catch (error) {
    console.error('Error fetching brand details:', error);
    return res.status(500).json({ message: "An error occurred while fetching brand details", success: false });
  }
};

// Get brand details by ID
module.exports.getBrandDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format", success: false });
    }

    const brandDetails = await BrandDetails.findById(id);

    if (!brandDetails) {
      return res.status(404).json({ message: "Brand details not found", success: false });
    }

    return res.status(200).json({ brandDetails, success: true });
  } catch (error) {
    console.error('Error fetching brand details by ID:', error);
    return res.status(500).json({ message: "An error occurred while fetching the brand details", success: false });
  }
};