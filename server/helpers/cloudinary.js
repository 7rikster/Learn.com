const cloudinary = require('cloudinary').v2;

//configure 
cloudinary.config({
    cloud_name: process.env.COLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(process.env.COLOUDINARY_API_KEY8);


const uploadMediaToCloudinary = async (filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Could not upload file to cloudinary');
    }
}

const deleteMediaFromCloudinary = async (publicId)=>{
    try {
        
        await cloudinary.uploader.destroy(publicId);

    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete file from cloudinary');
    }
}

module.exports = {uploadMediaToCloudinary, deleteMediaFromCloudinary};