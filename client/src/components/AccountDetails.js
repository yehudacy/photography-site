import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import {
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useUser } from "../hooks/useUser";

const ClientAccountDetails = () => {
  const { user } = useUser();

  const [clientDetails, setClientDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    buildingNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `users/${
            !user?.isAdmin ? user?.client_id : user?.administrator_id
          }`
        );
        delete data.client_id;
        setClientDetails(data);
        console.log(data);
      } catch (error) {}
    };
    getAccountDetails();
  }, [user]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", clientDetails);
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
    console.log("Selected file:", file);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        margin: "auto",
        padding: "16px",
        textAlign: "center",
        border: "2px solid #ccc",
        borderRadius: "8px",
        backgroundColor: isEditing ? "#E1F5FE" : "transparent",
        transition: "background-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "104px", // Adjust this value to lower the form
      }}
    >
      <Avatar
        alt="Client Avatar"
        src="https://via.placeholder.com/150"
        sx={{ width: "100px", height: "100px", marginBottom: "16px" }}
      />
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Account Details
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {Object.entries(clientDetails).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              value={value}
              type={
                key.includes("password") && !key.includes("confirm")
                  ? showPassword
                    ? "text"
                    : "password"
                  : "text"
              } // Show/hide password
              disabled={!isEditing}
              onChange={handleChange(key)}
              sx={{
                color: isEditing ? "#1976D2" : "inherit",
                backgroundColor: isEditing
                  ? "rgba(173, 216, 230, 0.1)"
                  : "transparent",
              }}
              InputProps={
                key.includes("password") ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                } : {}
              }
            />
          </Grid>
        ))}
        {isEditing && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Confirm Password"
              fullWidth
              value={clientDetails.confirmPassword}
              type={showPassword ? "text" : "password"}
              onChange={handleChange("confirmPassword")}
              sx={{
                color: isEditing ? "#1976D2" : "inherit",
                backgroundColor: isEditing
                  ? "rgba(173, 216, 230, 0.1)"
                  : "transparent",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ marginTop: "16px", width: "100%" }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
                sx={{ marginRight: "8px", textTransform: "none" }}
              >
                save changes
              </Button>
              <Button
                variant="outlined"
                onClick={handleToggleEdit}
                sx={{ textTransform: "none" }}
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
          <Grid item xs={12} sx={{ marginTop: "16px", width: "100%" }}>
            <label htmlFor="avatar-input">
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                component="span"
                sx={{ color: "#1976D2", textTransform: "none" }}
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
