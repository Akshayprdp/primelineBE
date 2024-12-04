const express = require("express");
const router = express.Router(); 
const { addService, getAllServices, getServiceById } = require("../Controllers/serviceController");
const upload = require('../Middleware/Multer');
const { addNewsroomEntry,getAllNewsrooms, getNewsroomById } = require("../Controllers/newsroomController");
const { adminLogin } = require("../Controllers/adminController");

// post
router.post('/adminlogin', adminLogin);
router.post('/addServices',upload.single('image'), addService);
router.post('/addnews',upload.single('image'), addNewsroomEntry);

// get
router.get('/newsrooms', getAllNewsrooms);
router.get('/newsrooms/:id', getNewsroomById);
router.get('/services',getAllServices);
router.get('/services/:id',getServiceById);



module.exports = router;
