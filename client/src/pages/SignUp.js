import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "../components/Loading";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    buildingNumber: "",
    city: "",
    allowExtraEmails: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const moveTo = useLocation().state?.moveTo;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { validatedForm, isValid } = validateForm(formData);
    if (isValid) {
      try {
        const { data } = await axiosInstance.post("users", validatedForm);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          street: "",
          buildingNumber: "",
          city: "",
          allowExtraEmails: false,
        });
        restErrors();
        // console.log(data);
        navigate("/login", { state: { moveTo: moveTo } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = (formData) => {
    const validatedForm = { ...formData };
    let isValid = true;
    const requiredFields = ["firstName", "lastName", "email", "password"];
    const NonRequiredFields = ["street", "buildingNumber", "city"];
    const fieldNames = Object.keys(validatedForm);
    fieldNames.forEach((fieldName) => {
      if (requiredFields.includes(fieldName) && !validatedForm[fieldName]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "This field is required",
        }));
        isValid = false;
      } else if (fieldName === "password") {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(validatedForm.password)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]:
              "Password must be at least 6 characters with at least one uppercase and one lowercase letter",
          }));
          isValid = false;
        }
      } else if(NonRequiredFields.includes(fieldName)){
        validatedForm[fieldName] = null;
      }
    });
    if(isValid) {
      restErrors();
    }
    return { validatedForm, isValid };
  };

  const restErrors = () => {
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading && <Loading />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* ... other Grid items */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="street"
                  fullWidth
                  id="street"
                  label="Street"
                  autoFocus
                  value={formData.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="buildingNumber"
                  label="Building Number"
                  name="buildingNumber"
                  autoComplete="family-name"
                  value={formData.buildingNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="allowExtraEmails"
                      color="primary"
                      checked={formData.allowExtraEmails}
                      onChange={handleChange}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
