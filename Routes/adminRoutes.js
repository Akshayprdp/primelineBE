const express = require("express");
const router = express.Router(); 
const {getAllBrandDetails,getBrandDetailsById,addBrandDetails} = require("../Controllers/BrandDetailsController");
const {addCoverPic,getAllCoverPics} = require("../Controllers/coverPicController");
const upload = require('../Middleware/Multer');
const { adminLogin } = require("../Controllers/adminController");

// post
router.post('/adminlogin', adminLogin);
router.post('/brand-details', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images' }]), addBrandDetails);
router.post('/cover-pics', upload.single('coverPic'), addCoverPic);


// get
router.get('/brand-details', getAllBrandDetails);
router.get('/brand-details/:id', getBrandDetailsById);
router.get('/cover-pics', getAllCoverPics);





module.exports = router;
