import { useState } from "react";
import { useUser } from '../hooks/useUser';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useUser();
  const moveTo = useLocation().state?.moveTo;
  const packagePrice = useLocation().state?.packagePrice;
  



  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "email is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const { data } = await axiosInstance.post("users/login", formData);
        // console.log(data)
        loginUser(data);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;
        if(moveTo) return  navigate(moveTo,{state:{packagePrice}});
        !data.isAdmin && navigate("/client");
        data.isAdmin && navigate("/admin");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error)
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
    <Box sx={{ width: "100%", height: "90vh" }}>
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
            label="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
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
              <Link component={RouterLink} to={"/signup"} state={{moveTo:moveTo}} variant="body2">
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
