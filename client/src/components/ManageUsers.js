import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemText,
  Button,
  IconButton,
  ListItemButton,
  Grid,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import JobCard from "./JobCard";
import AdminImageGrid from "./AdminImageGrid";
import axiosInstance from "../axiosInstance";

const ManageUsers = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobImages, setJobImages] = useState([]);
  const [imagesError, setImagesError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axiosInstance.get("/users/clientList");
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleClientClick = async (client) => {
    setSelectedClient(client);
    setSelectedJob(null);
    setJobImages([]);
    // Fetch jobs for the selected user from the API or mock data
    const clientId = client.client_id;
    try {
      const { data } = await axiosInstance.get(`/jobs/client/${clientId}`);
      setJobs(data);
    } catch (error) {
      // console.error("Error fetching jobs:", error);
      if (error.request.status === 404) {
        setJobs([]);
        setJobsError(
          `No jobs found for ${
            clients.find((client) => client.client_id === clientId)?.fullName
          }`
        );
      }
    }
  };

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    try {
      const { data } = await axiosInstance.get(`/gallery/jobs/${job.job_id}`);
      console.log(data);
      setJobImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDeleteJobImages = () => {
    if (selectedJob) {
      console.log(`Deleting images for job: ${selectedJob.title}`);
      setJobImages([]);
      alert("All images for the selected job have been deleted.");
    }
  };

  const handleBackToUsers = () => {
    setSelectedClient(null);
    setJobs([]);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setJobImages([]);
  };

  const handleImageClick = () => {};

  const handleDeleteClick = () => {};

  const handleSetMainClick = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Manage Users
      </Typography>
      {!selectedClient && (
        <Box>
          <Typography variant="subtitle1">Users:</Typography>
          <List>
            {clients.map((client) => (
              <ListItemButton
                key={client.client_id}
                onClick={() => handleClientClick(client)}
                sx={{
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#e6f2ff",
                  },
                }}
              >
                <ListItemText primary={client.fullName} color="primary" />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}

      {selectedClient && !selectedJob && (
        <Box>
          <IconButton
            onClick={handleBackToUsers}
            sx={{ marginBottom: 2, alignSelf: "flex-end" }}
          >
            <ArrowBackIcon />
          </IconButton>
          {jobs.length > 0 ? (
            <>
              <Typography variant="subtitle1">
                Jobs for {selectedClient.name}:
              </Typography>
              <List>
                <Grid container spacing={3}>
                  {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                      <JobCard job={job} onClick={() => handleJobClick(job)} />
                    </Grid>
                  ))}
                </Grid>
              </List>
            </>
          ) : (
            <Typography variant="subtitle1">{jobsError}</Typography>
          )}
        </Box>
      )}

      {selectedJob && (
        <Box>
          <IconButton
            onClick={handleBackToJobs}
            sx={{ marginBottom: 2, alignSelf: "flex-end" }}
          >
            <ArrowBackIcon />
          </IconButton>
          {jobImages.length > 0 ? (
            <>
              <Typography variant="subtitle1">
                Images for {selectedJob.title}:
              </Typography>
              <AdminImageGrid
                images={jobImages}
                onImageClick={handleImageClick}
                onDeleteClick={handleDeleteClick}
                onSetMainClick={handleSetMainClick}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteJobImages}
                sx={{ marginTop: 2, textTransform: "none" }}
              >
                Delete all images
              </Button>
            </>
          ) : (
            <Typography variant="subtitle1">{imagesError}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageUsers;
