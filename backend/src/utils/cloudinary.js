import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import fs from 'fs'

dotenv.config({
    path: "./.env"
});

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    }
);

export const uploadOnCloudinary = async (localFilePath) =>{
    try{
        console.log(localFilePath)
        if(!localFilePath){
            return null
        }
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type: "raw"
            }
        )
        console.log("file uploaded on cloudinary.file src: ",response.url)
        fs.unlinkSync(localFilePath)
        return response
    }
    catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }

    return null;
}
}

export const deleteFromCloudinary = async (
    publicId,
    resourceType = "image"
) => {
    try {
        if (!publicId) {
            return null;
        }

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        console.log("File deleted successfully from Cloudinary.");

        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);

        return null;
    }
};

