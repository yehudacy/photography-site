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


//get images for a single job
const getImagesOfOneJob = async (jobId) => {
    const getImagesOfOneJobQuery = `
    SELECT * FROM job_images
    WHERE job_id = ?`;
    const [images] = await pool.query(getImagesOfOneJobQuery, [jobId]);
    // console.log(images)
    return images;
  }
module.exports = {addImage, getImagesOfOneJob}