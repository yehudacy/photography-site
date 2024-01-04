// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

// Log the configuration
// console.log(cloudinary.config());

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
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};



module.exports = { uploadImage };
