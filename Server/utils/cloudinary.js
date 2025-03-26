const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');     

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinaryStorage = new CloudinaryStorage({ 
    cloudinary,
    params: {
        folder: 'SAP_Training',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        File: "auto",
    }
}); 

cloudinaryStorage = multer({ storage: cloudinaryStorage });