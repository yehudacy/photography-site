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
      use_filename: false,
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

//     try {
//       // Upload the image
//       const result = cloudinary.uploader.upload_stream(imagePath, options, async(error, result) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Error uploading file to Cloudinary');
//           } else {
//             console.log(result);
//           }
//       });
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };

// (async () => {

// Set the image to upload
const imagePath = "Image_20230927_2259556422041759995742833.jpg";

// Upload the image
// const publicId = await uploadImage(imagePath);

// Get the colors in the image
// const colors = await getAssetInfo(publicId);

// Create an image tag, using two of the colors in a transformation
// const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

// Log the image tag to the console
// console.log(imageTag);

// })();

module.exports = { uploadImage };
