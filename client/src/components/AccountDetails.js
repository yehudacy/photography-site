import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const ClientAccountDetails = () => {
  const [clientDetails, setClientDetails] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    city: 'Cityville',
    street: 'Street Lane',
    buildingNumber: '123',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', clientDetails);
    setIsEditing(false);
  };

  const handleChange = (field) => (event) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [field]: event.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);

    // You can perform additional logic if needed
    console.log('Selected file:', file);
  };

  return (
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        margin: 'auto',
        padding: '16px',
        textAlign: 'center',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: isEditing ? '#E1F5FE' : 'transparent',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: '104px', // Adjust this value to lower the form
      }}
    >
      <Avatar
        alt="Client Avatar"
        src="https://via.placeholder.com/150"
        sx={{ width: '100px', height: '100px', marginBottom: '16px' }}
      />
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        Account Details
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {Object.entries(clientDetails).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              value={value}
              disabled={!isEditing}
              onChange={handleChange(key)}
              sx={{
                color: isEditing ? '#1976D2' : 'inherit',
                backgroundColor: isEditing ? 'rgba(173, 216, 230, 0.1)' : 'transparent',
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} sx={{ marginTop: '16px', width: '100%' }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
                sx={{ marginRight: '8px', textTransform: 'none' }}
              >
                save changes
              </Button>
              <Button
                variant="outlined"
                onClick={handleToggleEdit}
                sx={{ textTransform: 'none' }}
              >
                cancel
              </Button>
            </>
          ) : (
            <IconButton color="primary" onClick={handleToggleEdit}>
              <EditIcon />
            </IconButton>
          )}
        </Grid>
        {isEditing && (
          <Grid item xs={12} sx={{ marginTop: '16px', width: '100%' }}>
            <label htmlFor="avatar-input">
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                component="span"
                sx={{ color: '#1976D2', textTransform: 'none' }}
              >
                change avatar
              </Button>
            </label>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ClientAccountDetails;
