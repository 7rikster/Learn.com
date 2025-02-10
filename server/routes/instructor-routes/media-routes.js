const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadMediaToCloudinary, deleteMediaFromCloudinary} = require('../../helpers/cloudinary');



const upload = multer({dest: 'uploads/'});

router.post('/upload', upload.single('file'), async (req, res)=>{
    try {
        
        const result = await uploadMediaToCloudinary(req.file.path);
        res.status(200).json({
            success: true,
            data: result
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error uploading file to cloudinary'
        })
    }
});

router.delete('/delete/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        
        if(!id){
            return res.statur(400).json({
                success: false,
                message: 'Asset Id is required'
            })
        }
        await deleteMediaFromCloudinary(id);
        
        res.status(200).json({
            success: true,
            message: 'File deleted from cloudinary'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting file from cloudinary'
        })
    }
});

module.exports = router;