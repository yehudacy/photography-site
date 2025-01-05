const { pool } = require("./dbConnection");

//add a new job
const addJob = async ({ client_id, title }) => {
  const addJobsQuery = `
    INSERT INTO jobs (client_id, title, create_date) 
    VALUES (?, ?, ?)`;
  const [{ insertId }] = await pool.query(addJobsQuery, [
    client_id,
    title,
    new Date(),
  ]);
  // console.log({insertId});
  return await getJob(insertId);
};

const getJob = async (jobId) => {
  const getJobByIdQuery = `
    SELECT * FROM jobs
    WHERE job_id = ?`;
  const [[job]] = await pool.query(getJobByIdQuery, [jobId]);
  // console.log(job);
  return job;
};
const getAllMainJobImagesIds = async () => {
  const getAllMainJobImagesIdsQuery = `
    SELECT job_id, job_image_id FROM jobs`;
  const [mainImageIds] = await pool.query(getAllMainJobImagesIdsQuery);
  const mappedMainImageIds = mainImageIds.reduce((acc, curr) => {
    if(curr.job_image_id){
      acc[curr.job_id] = curr.job_image_id
    } 
    return acc;
  }, {})
  // console.log(mappedMainImageIds);
  return mappedMainImageIds;
};

const setJobImage = async (jobImageId, jobId) => {
  const setJobImageQuery = `
    UPDATE jobs
    SET job_image_id = ?
    WHERE job_id = ?`;

  const [{ affectedRows }] = await pool.query(setJobImageQuery, [
    jobImageId,
    jobId,
  ]);
  return getJob(jobId);
};

const getJobsPerClient = async (clientId) => {
  const getJobsPerClientQuery = `
    SELECT job_id, job_image_id, title FROM jobs
    WHERE client_id = ?
    AND delete_date IS NULL`;
  const [jobs] = await pool.query(getJobsPerClientQuery, [clientId]);
    // console.log(jobs);
  return jobs;
};

module.exports = { addJob, getJob, getJobsPerClient, setJobImage, getAllMainJobImagesIds };
