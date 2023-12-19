import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your login logic here
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  return (
    <Box
      sx={{ width: "100%", height: '90vh',}}
    >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
          backgroundColor: "white",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          margin="normal"
          sx={{ mt: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember Me"
          sx={{ mt: 1, textAlign: "left" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link href="#" variant="body2">
            Forgot Password?
          </Link>
          <Box mt={1}>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
      </Grid>
    </Box>
  );
};

export default Login;
