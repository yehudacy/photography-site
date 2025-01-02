import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { btnTextTransformNone } from "../utils/utilityVars";
import AdminImageGrid from "./AdminImageGrid";
import JobCard from "./JobCard";
import eventEmitter from '../utils/eventEmitter'

const ManageUsers = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobImages, setJobImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pendingUi, setPendingUi] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [setMainImageDialogOpen, setSetMainImageDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [setMainError, setSetMainError] = useState(null);

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
      // console.log(data);
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

  const handleDeleteClick = (jobImage) => {
    setSelectedImage(jobImage);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSingleJobImage = async (jobImage) => {
    setPendingUi(true);
    setDeleteError(null);
    try {
      const { data } = await axiosInstance.delete(
        `/gallery/jobs/image/${jobImage.job_image_id}`
      );
      if (data) {
        setJobImages((prev) =>
          prev.filter((image) => image.job_image_id !== jobImage.job_image_id)
        );
        setPendingUi(false);
        setDeleteDialogOpen(false);
        setSelectedImage(null);
        setPendingUi(false);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      setDeleteError(
        "An error occurred while deleting the image. Please try again."
      );
      setPendingUi(false);
      return false;
    }
  };

  const handleSetMainClick = (jobImage) => {
    setSelectedImage(jobImage);
    setSetMainImageDialogOpen(true);
  };

  const handleSetMainJobImage = async (jobImage) => {
    setPendingUi(true);
    setSetMainError(null); // Clear any previous error

    try {
      const { data } = await axiosInstance.put(`/jobs/img/${jobImage.job_id}`, {
        jobImageId: jobImage.job_image_id,
      });
      setSetMainImageDialogOpen(false);
      setSelectedImage(null);
      setPendingUi(false);
      eventEmitter.emit('mainImageUpdated', jobImage.job_image_id)
    } catch (error) {
      console.log(error);
      setSetMainError(
        "An error occurred while setting the main image. Please try again."
      );
      setPendingUi(false);
    }
  };

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
                    <Grid item xs={12} sm={6} md={4} key={job.job_id}>
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
            <Typography variant="subtitle1">No images found.</Typography>
          )}
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this image?
          </Typography>
          {deleteError && (
            <Typography variant="body2" color="error">
              {deleteError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            variant="contained"
            sx={btnTextTransformNone}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteSingleJobImage(selectedImage)}
            disabled={pendingUi}
            color="error"
            variant="contained"
            sx={btnTextTransformNone}
          >
            {pendingUi ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Set Main Image Confirmation Dialog */}
      <Dialog
        open={setMainImageDialogOpen}
        onClose={() => setMainImageDialogOpen(false)}
      >
        <DialogTitle>Set as Main Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to set this image as the main image?
          </Typography>
          {setMainError && (
            <Typography variant="body2" color="error">
              {setMainError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSetMainImageDialogOpen(false)}
            color="primary"
            variant="contained"
            sx={btnTextTransformNone}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSetMainJobImage(selectedImage)}
            color="primary"
            variant="contained"
            disabled={pendingUi}
            sx={btnTextTransformNone}
          >
            {pendingUi ? "Saving..." : "Set as Main Image"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
