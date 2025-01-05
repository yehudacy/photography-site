const express = require("express");
const { authenticateToken } = require("../authentication/authentication");
const {
  getJobsPerClient,
  getJob,
  addJob,
  setJobImage,
  getAllMainJobImagesIds,
} = require("../../database/jobsDB");

const jobsRouter = express.Router();

//add a job
jobsRouter.post("/", authenticateToken, async ({ body }, res) => {
  const jobToAdd = body;
  try {
    const addedJob = await addJob(body);
    if (addedJob) {
      res.status(201).json(addedJob);
    } else {
      throw new Error(`Failed to add job!`, { cause: 400 });
    }
  } catch (error) {
    // console.log(error);

    res.status(error.cause).json({ message: error.message });
  }
});

jobsRouter.get("/mainimgIds", authenticateToken, async (req, res) => {
  try {
    const mainImgIds = await getAllMainJobImagesIds();
    res.status(200).json(mainImgIds);
  } catch (error) {
    res.status(500).json({ message: "Failed to get main job images ids" });
  }
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
jobsRouter.get(
  "/client/:clientId",
  authenticateToken,
  async ({ params }, res) => {
    const { clientId } = params;
    if (!clientId) {
      throw new Error("Client ID is required", { cause: 400 });
    }
    try {
      const jobListPerClient = await getJobsPerClient(clientId);
      if (jobListPerClient.length > 0) {
        res.status(200).json(jobListPerClient.filter((job) => job.delete_date === null));
      } else {
        throw new Error(`No jobs war found for user ${clientId}!`, {
          cause: 404,
        });
      }
    } catch (error) {
      res.status(error.cause).json({ message: error.message });
    }
  }
);

jobsRouter.put(
  "/img/:jobId",
  authenticateToken,
  async ({ body, params: { jobId } }, res) => {
    try {
      const jobToEdit = await getJob(jobId);
      if (jobToEdit) {
        const data = await setJobImage(body.jobImageId, jobId);
        // console.log(data);
        res.status(200).json(data);
      } else {
        throw new Error(`No job found with the id ${jobId}`, {
          cause: 404,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(error.cause || 500).json({ message: error.message });
    }
  }
);

module.exports = { jobsRouter };
