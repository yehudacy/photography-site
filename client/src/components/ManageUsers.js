import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  ListItemButton,
  Grid,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import JobCard from "./JobCard";
import AdminImageGrid from "./AdminImageGrid";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobImages, setJobImages] = useState([]);

  useEffect(() => {
    // Fetch users from the API or mock data
    const fetchUsers = async () => {
      const mockUsers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ];
      setUsers(mockUsers);
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setSelectedJob(null);
    setJobImages([]);
    // Fetch jobs for the selected user from the API or mock data
    const mockJobs = [
      { id: 1, title: "Home design Photography" },
      { id: 2, title: "Product Photography" },
      { id: 3, title: "New Born Photography" },
    ];
    setJobs(mockJobs);
  };

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    // Fetch images for the selected job from the API or mock data
    const mockImages = [
      {
        image_id: 1,
        src: "https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498118/6ecgep8m3ft9txcpic%2011.jpg.jpg",
        altText: "image1.jpg",
      },
      {
        image_id: 2,
        src: "https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498159/6ecgep8m3ftapvopic%2012.jpg.jpg",
        altText: "image2.jpg",
      },
      {
        image_id: 3,
        src: "https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498177/6ecgep8m3ftb47bpic%2013.jpg.jpg",
        altText: "image3.jpg",
      },
    ];
    setJobImages(mockImages);
  };

  const handleDeleteJobImages = () => {
    if (selectedJob) {
      console.log(`Deleting images for job: ${selectedJob.title}`);
      setJobImages([]);
      alert("All images for the selected job have been deleted.");
    }
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
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

      {!selectedUser && (
        <Box>
          <Typography variant="subtitle1">Users:</Typography>
          <List>
            {users.map((user) => (
              <ListItemButton
                key={user.id}
                onClick={() => handleUserClick(user)}
                sx={{
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#e6f2ff",
                  },
                }}
              >
                <ListItemText primary={user.name} color="primary" />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}

      {selectedUser && !selectedJob && (
        <Box>
          <IconButton
            onClick={handleBackToUsers}
            sx={{ marginBottom: 2, alignSelf: "flex-end" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="subtitle1">
            Jobs for {selectedUser.name}:
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
          <Typography variant="subtitle1">
            Images for {selectedJob.title}:
          </Typography>
          {/* <List>
            {jobImages.map((image, index) => (
              <ListItem key={index}>
                <ListItemText primary={image} />
              </ListItem>
            ))}
          </List> */}
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
        </Box>
      )}
    </Box>
  );
};

export default ManageUsers;
