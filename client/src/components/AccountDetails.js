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
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Edit as EditIcon,
  Rectangle,
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
    city: "",
    street: "",
    buildingNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [alert, setAlert] = useState("");
  const [isPassChanged, setIsPassChanged] = useState(false);

  useEffect(() => {
    if (isEditing) return;
    const getAccountDetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `users/${!user?.isAdmin ? user?.client_id : user?.administrator_id}`
        );
        if(!user.isAdmin) delete data.client_id;
        else if (user.isAdmin) delete data.administrator_id;
        setClientDetails(data);
        // console.log(data);
      } catch (error) {}
    };
    getAccountDetails();
  }, [user, isEditing]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    if(isPassChanged) {
      if(clientDetails.password !== confirmPassword){
        return setAlert('The passwords do not match');
      }
    }
    try {
      console.log(222222)
      const { data } = await axiosInstance.put(
        `/users/${!user.isAdmin ? user.client_id : user.administrator_id}`,
        clientDetails
      );
      console.log(data);

      console.log("Saving changes:", clientDetails);
      setIsEditing(false);
      setAlert("success");
      setTimeout(() => setAlert(""), 5000)
    } catch (error) {
      console.log(error);
      setAlert("error");
      setTimeout(() => setAlert(""), 5000)
    }
  };

  const handleChange = (field) => (event) => {
    if(field === "password") setIsPassChanged(true);
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
              value={value || ""}
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
                key.includes("password")
                  ? {
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
                    }
                  : {}
              }
            />
          </Grid>
        ))}
        {isEditing && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Confirm Password"
              fullWidth
              value={confirmPassword}
              type={showPassword ? "text" : "password"}
              onChange={({ target: { value } }) => setConfirmPassword(value)}
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
                sx={{ color: "#1976D2", textTransform: "none" , mb: 1}}
              >
                change avatar
              </Button>
            </label>
          </Grid>
        )}
      </Grid>
      {alert &&
        ((alert === "error" || alert === "The passwords do not match") ? (
          <Alert severity="error">
            <AlertTitle>{alert}</AlertTitle>
            changes not applied — <strong>please try again!</strong>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>{alert}</AlertTitle>
            changes applied!  —{" "}
            <strong>
              Thank you! 
            </strong>
          </Alert>
        ))}
    </Grid>
  );
};

export default ClientAccountDetails;
