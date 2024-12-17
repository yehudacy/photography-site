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
  // console.log(/insertId);
  return await getJob(insertId);
};

const getJob = async (jobId) => {
  const getJobByIdQuery = `
    SELECT * FROM jobs
    WHERE job_id = ?`;
  const [[job]] = await pool.query(getJobByIdQuery, [jobId]);
  // console.log(job)
  return job;
};

const getJobsPerClient = async (clientId) => {
  const getJobsPerClientQuery = `
    SELECT job_id, title FROM jobs
    WHERE client_id = ?`;
  const [jobs] = await pool.query(getJobsPerClientQuery, [clientId]);
//   console.log(jobs);
  return jobs;
};

// getJobsPerClient(5)
// getJob(5)
// const b = async() => {
//     const a = await addJob({client_id :3, title: "advertising campaign"})
//     console.log(a)
// }
// b();

module.exports = { addJob, getJob, getJobsPerClient };
