const { pool } = require('./dbConnection');
const { getCategoryIdByName } = require('./categoryDB')

//add an image to the data base
const addImage = async (categoryId, src, clientId = null) => {
        let addImageQuery = `
        INSERT INTO images (category_id, client_id, src) 
        VALUES (?, ?, ?);`;
        const [addedImage] = await pool.query(addImageQuery, [categoryId, clientId, src]);
        // console.log(addedImage);
        return addedImage;
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


 



 
  // getAllImages();
  // getImagesOfOneClient(2)
  module.exports = {addImage, getAllImages, getImagesOfOneClient}