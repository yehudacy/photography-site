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


//get an image by id
const getImage = async (imageId) => {
    
}


 



 
  // getAllImages();
  module.exports = {addImage, getAllImages}