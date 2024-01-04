// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = cloudinary.uploader.upload_stream(imagePath, options, async(error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error uploading file to Cloudinary');
          } else {
            console.log(result);
          }
      });
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

// (async () => {

    // Set the image to upload
    const imagePath = 'Image_20230927_2259556422041759995742833.jpg';

    // Upload the image
    // const publicId = await uploadImage(imagePath);
   


    // Get the colors in the image
    // const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    // const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

    // Log the image tag to the console
    // console.log(imageTag);

// })();

module.exports = {uploadImage}