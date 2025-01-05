const cloudinary = require("cloudinary").v2;
const uniqid = require("uniqid");

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
      (error, { secure_url, public_id }) => {
        if (error) {
          reject(error);
        } else {
          resolve({ secure_url, public_id });
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const uploadImages = async (files) => {
  return new Promise(async (resolve, reject) => {
    const uploadPromises = files.map((file) => {
      return new Promise((innerResolve, innerReject) => {
        const fileName = `${uniqid()}${file.originalname}`;
        const options = {
          public_id: fileName,
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        };
        const uploadStream = cloudinary.uploader.upload_stream(
          options,
          (error, { secure_url, public_id }) => {
            if (error) {
              innerReject(error);
            } else {
              innerResolve({ secure_url, public_id });
            }
          }
        );
        uploadStream.end(file.buffer);
      });
    });
    Promise.all(uploadPromises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
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

const deleteImagesFromCloud = async (publicIds) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.api.delete_resources(publicIds, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { uploadImage, uploadImages, deleteImageFromCloud, deleteImagesFromCloud };
