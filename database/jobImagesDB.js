const { pool } = require('./dbConnection');

//add an image to the data base
const addImage = async (jobId, clientId, src, cloudPublicId) => {
    let addJobImageQuery = `
    INSERT INTO job_images (job_id, client_id, src, cloud_public_id) 
    VALUES (?, ?, ?, ?);`;
    const [addedImage] = await pool.query(addJobImageQuery, [jobId, clientId, src, cloudPublicId]);
    // console.log({addedImage});
    return addedImage;
};

const getJobImage = async (imageId) => {
  const getJobImageByIdQuery = `
    SELECT * FROM job_images
    WHERE job_image_id = ?`;
  const [[image]] = await pool.query(getJobImageByIdQuery, [imageId]);
    // console.log(image);
  return image;
};
//get images for a single job
const getImagesOfOneJob = async (jobId) => {
    const getImagesOfOneJobQuery = `
    SELECT * FROM job_images
    WHERE job_id = ?`;
    const [images] = await pool.query(getImagesOfOneJobQuery, [jobId]);
    // console.log(images)
    return images;
  }

  //get images of one client by client id
const getJobImagesOfOneClient = async (clientId) => {
  const getJobImagesOfOneClientQuery = `
  SELECT * FROM job_images
  WHERE client_id = ?`;
  const [images] = await pool.query(getJobImagesOfOneClientQuery, [clientId]);
  // console.log(images)
  return images;
};

  const deleteJobImage = async (imageId) => {
    const jobImageToDelete = await getJobImage(imageId);
    const deleteJobImageQuery = `
    DELETE FROM job_images WHERE job_image_id = ?;`
    const [{ affectedRows }] = await pool.query(deleteJobImageQuery, [imageId]);
    if(!affectedRows && !jobImageToDelete){
        throw new Error(`No image with the Id of ${imageId}`);
    }
    // console.log(jobImageToDelete)
    return jobImageToDelete
  }

module.exports = {addImage, getImagesOfOneJob, getJobImage, deleteJobImage, getJobImagesOfOneClient}