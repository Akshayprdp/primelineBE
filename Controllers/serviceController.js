const Services = require('../Model/serviceModel');
const path = require('path');
const mongoose = require('mongoose');

module.exports.addService = async (req, res) => {
  try {
    const { heading, title } = req.body;

    // Check if the image file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required", success: false });
    }

    // Create a new service entry
    const newService = new Services({
      heading,
      title,
      image: `/uploads/${req.file.filename}`, // Assuming multer is handling file uploads
    });

    // Save the new service entry to the database
    await newService.save();

    return res.status(200).json({ message: "Service added successfully", success: true });
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({ message: "An error occurred", success: false });
  }
};


module.exports.getAllServices = async (req, res) => {
  try {
      const services = await Services.find();
      return res.status(200).json({ services, success: true });
  } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ message: "An error occurred while fetching services", success: false });
  }
};

// Get service by ID
module.exports.getServiceById = async (req, res) => {
  try {
      const { id } = req.params;

      // Validate the ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ID format", success: false });
      }

      const service = await Services.findById(id);

      if (!service) {
          return res.status(404).json({ message: "Service not found", success: false });
      }

      return res.status(200).json({ service, success: true });
  } catch (error) {
      console.error('Error fetching service by ID:', error);
      return res.status(500).json({ message: "An error occurred while fetching the service", success: false });
  }
};
