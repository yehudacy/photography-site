import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const BulkImageUploadForm = () => {
  const [clients, setClients] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [alert, setAlert] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

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

  const handleClientChange = async (event) => {
    const clientId = event.target.value;
    setSelectedClient(clientId);
    setSelectedJob(""); // Reset job when client changes

    try {
      const { data } = await axiosInstance.get(`/jobs/${clientId}`);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleJobChange = (event) => {
    const jobId = event.target.value;
    setSelectedJob(jobId);
    const selectedClientId = clients.find(
      (client) => client.id === selectedClient
    )?.id;
    if (selectedClientId) {
      setSelectedClient(selectedClientId);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newImages = [...images, ...selectedFiles].slice(0, 10); // Limit to 10 images

    setImages(newImages);

    const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);

    // Revoke URL of the removed image to free up memory
    URL.revokeObjectURL(previewUrls[index]);

    setImages(updatedImages);
    setPreviewUrls(updatedPreviewUrls);
  };

  const handleClearImages = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviewUrls([]);
  };

  const uploadToServer = async (formData) => {
    try {
      const { data, status } = await axiosInstance.post(
        "/gallery/bulk-upload",
        formData
      );
      if (status === 201) {
        setSelectedClient("");
        setSelectedJob("");
        handleClearImages();

        setAlert("success");
        setAlertMsg(data.message);

        setTimeout(() => {
          setAlert("");
          setAlertMsg("");
        }, 5000);
      } else {
        throw data;
      }
    } catch (error) {
      console.error(error.message);
      setAlert("error");
      setAlertMsg(error.message);
      setTimeout(() => {
        setAlert("");
        setAlertMsg("");
      }, 5000);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("clientId", selectedClient);
    formData.append("jobId", selectedJob);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    uploadToServer(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Bulk Image Upload
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="client">Client</InputLabel>
        <Select
          id="client"
          value={selectedClient}
          onChange={handleClientChange}
          label="Client"
        >
          {clients.length > 0 ? (
            clients.map((client) => (
              <MenuItem key={client.client_id} value={client.client_id}>
                {client.fullName}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No clients found</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="job">Job</InputLabel>
        <Select
          id="job"
          value={selectedJob}
          onChange={handleJobChange}
          label="Job"
          disabled={!selectedClient}
        >
          {jobs.length > 0 ? jobs.map((job) => (
            <MenuItem key={job.job_id} value={job.job_id}>
              {job.title}
            </MenuItem>
          )) : 
          <MenuItem>
          {`No jobs found for client ${clients.find((client) => client.client_id === selectedClient)?.fullName}`} 
          </MenuItem>}
        </Select>
      </FormControl>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="bulkUploadInput"
        />
        <label htmlFor="bulkUploadInput">
          <Button
            variant="contained"
            component="span"
            sx={{ textTransform: "none" }}
          >
            Choose Images (Max 10)
          </Button>
        </label>
        {images.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearImages}
            sx={{ textTransform: "none", marginLeft: 2 }}
          >
            Clear Images
          </Button>
        )}
      </div>

      {previewUrls.length > 0 && (
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          {previewUrls.map((url, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={index}
              sx={{ position: "relative" }}
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: -2,
                  right: -13,
                  backgroundColor: "#e6f2ff",
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={images.length === 0 || !selectedClient || !selectedJob}
        sx={{ textTransform: "none" }}
      >
        Upload Images
      </Button>

      {alert && (
        <Alert severity={alert} sx={{ marginTop: 2 }}>
          <AlertTitle>{alert}</AlertTitle>
          {alertMsg}
        </Alert>
      )}
    </Box>
  );
};

export default BulkImageUploadForm;
