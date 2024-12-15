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
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

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
      { id: 1, title: "Wedding Photoshoot" },
      { id: 2, title: "Product Photography" },
    ];
    setJobs(mockJobs);
  };

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    // Fetch images for the selected job from the API or mock data
    const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];
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

  return (
    <Box>
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
            {jobs.map((job) => (
              <ListItemButton key={job.id} onClick={() => handleJobClick(job)}>
                <ListItemText primary={job.title} />
              </ListItemButton>
            ))}
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
          <List>
            {jobImages.map((image, index) => (
              <ListItem key={index}>
                <ListItemText primary={image} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteJobImages}
            sx={{ marginTop: 2 }}
          >
            Delete All Images
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ManageUsers;
