import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_ARI_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null
        }
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log("file is uploaded on cloudinary");
        // console.log(response.url);
        fs.unlinkSync(localFilePath);//future me file upload karne ke baad local storage se remove ho jayegi
        return response;
    }catch(error){
        console.error('Error uploading to Cloudinary:', error); // Debug statement
        throw new Error('Cloudinary upload failed');
        // fs.unlinkSync(localFilePath)//remove the locally saved temp file as the upload operation got failed
        // return null;
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) {
            return null;
        }
        // Extract the public ID from the image URL
        const urlParts = imageUrl.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        console.log("publicId",publicId);

        // Delete the image from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("response",response);

        if (response.result !== 'ok') {
            throw new Error('Cloudinary deletion failed');
        }

        return response;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error); // Debug statement
        throw new Error('Cloudinary deletion failed');
    }
};
export {uploadOnCloudinary,
    deleteFromCloudinary
}