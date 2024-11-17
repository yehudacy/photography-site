const { pool } = require('./dbConnection');
const { getCategoryIdByName } = require('./categoryDB')

//add an image to the data base
const addImage = async (categoryId, src, clientId = null, cloudPublicId) => {
        let addImageQuery = `
        INSERT INTO images (category_id, client_id, src, cloud_public_id) 
        VALUES (?, ?, ?, ?);`;
        const [addedImage] = await pool.query(addImageQuery, [categoryId, clientId, src, cloudPublicId]);
        console.log({addedImage});
        return addedImage;
};

const getImage = async (imageId) => {
  const getImageByIdQuery = `
    SELECT * FROM images
    WHERE image_id = ?`;
  const [[image]] = await pool.query(getImageByIdQuery, [imageId]);
    console.log(image);
  return image;
};

//get all images
const getAllImages = async () => {
  const getImagesQuery = `
  SELECT * FROM images`;
  const [images] = await pool.query(getImagesQuery);
  // console.log(images)
  return images;
};


//get images of one client by client id
const getImagesOfOneClient = async (clientId) => {
  const getImagesOfOneClientQuery = `
  SELECT * FROM images
  WHERE client_id = ?
  ORDER BY category_id`;
  const [images] = await pool.query(getImagesOfOneClientQuery, [clientId]);
  // console.log(images)
  return images;
}

const deleteImage = async (imageId) => {
  const imageToDelete = await getImage(imageId);
  const deleteImageQuery = `
  DELETE FROM images WHERE image_id = ?;`
  const [{ affectedRows }] = await pool.query(deleteImageQuery, [imageId]);
  if(!affectedRows && !orderToDelete){
      throw new Error(`No image with the Id of ${imageId}`);
  }
  // console.log(imageToDelete)
  return imageToDelete
}
 



 
  // getAllImages();
  // getImagesOfOneClient(2)
  module.exports = {addImage, getAllImages, getImagesOfOneClient, getImage, deleteImage}