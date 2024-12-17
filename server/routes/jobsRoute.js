const express = require("express");
const { authenticateToken } = require("../authentication/authentication");
const { getJobsPerClient, getJob } = require("../../database/jobsDB");

const jobsRouter = express.Router();

//add a job
jobsRouter.post("/", async (req, res) => {
  try {
  } catch (error) {}
});

//get single job by id
jobsRouter.get("/:jobId", authenticateToken, async ({ params }, res) => {
  try {
    const { jobId } = params;
    const job = await getJob(jobId);
    // console.log(job);
    if (job) {
      return res.status(200).json(job);
    } else {
      throw new Error(`No job found with the id ${jobId}`, {
        cause: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(error.cause).json({ message: error.message });
  }
});

//get jobs for a single client
jobsRouter.get("/client/:clientId", authenticateToken, async ({params }, res) => {    
  const { clientId } = params;
  if (!clientId) {
    throw new Error("Client ID is required", { cause: 400 });
  }
  try {
    const jobListPerClient = await getJobsPerClient(clientId);
    console.log(jobListPerClient);
    if (jobListPerClient. length > 0) {
      res.status(200).json(jobListPerClient);
    } else {
      throw new Error(`No jobs war found for user ${clientId}!`, {
        cause: 404,
      });
    }
  } catch (error) {
    res.status(error.cause).json({ message: error.message });
  }
});

module.exports = { jobsRouter };
