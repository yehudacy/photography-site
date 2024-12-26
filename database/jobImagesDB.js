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

module.exports = {addImage}