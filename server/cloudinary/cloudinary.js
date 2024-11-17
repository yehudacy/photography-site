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


const deleteImageFromCloud = async (imageUrl) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  // console.log(publicId);
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

const getPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  let fileNameWithExtension = parts[parts.length - 1]; 
  const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    const baseName = fileNameWithExtension.substring(0, lastDotIndex); 
    const extension = fileNameWithExtension.substring(lastDotIndex + 1); 
    const lastDotIndex2 = baseName.lastIndexOf('.');
    if(lastDotIndex2 === -1){
      return replaceEncodedSpaces(`${baseName}.${extension}`);
    } else {
      const newBaseName = baseName.substring(0, lastDotIndex2);
      return replaceEncodedSpaces(`${newBaseName}.${extension}`); 
    }
  }
  return fileNameWithExtension;
};

const replaceEncodedSpaces = (input) => {
  return input.split('%20').join(' ');
};


module.exports = { uploadImage, deleteImageFromCloud };
