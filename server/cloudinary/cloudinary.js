const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

const uploadImage = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const options = {
      public_id: fileName,
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, {secure_url, public_id}) => {
        if (error) {
          reject(error);
        } else {          
          resolve({secure_url, public_id});
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};


const deleteImageFromCloud = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


module.exports = { uploadImage, deleteImageFromCloud };
 