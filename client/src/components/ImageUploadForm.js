import React, { useEffect, useState } from "react";
import axiosInstance from '../axiosInstance';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
} from "@mui/material";

const ImageUploadForm = () => {
  //state for the category options
  const [options, setOptions] = useState([]);
  //fields state
  const [category, setCategory] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isMainImage, setIsMainImage] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


 useEffect(() => {
    const fetchCategoryNames = async () => {
      try{
        const {data} = await axiosInstance.get('category');
        // console.log(data);
        setOptions(data);
      } catch(error){
        console.log('Error:', error);
      }
    }
    fetchCategoryNames();
 }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClientEmailChange = (event) => {
    setClientEmail(event.target.value);
  };

  const handleIsMainImageChange = (event) => {
    setIsMainImage(event.target.checked);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // If user cancels file selection, do nothing
    if (!selectedFile) {
      return;
    }
    // Revoke the previous object URL before creating a new one
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    // Create a preview URL for the selected file
    const newPreviewUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(newPreviewUrl);
  };

  const handleClearFile = () => {
    // Revoke the object URL before clearing the file
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const uploadToServer = async (formData) => {
    try {
      const result = await axiosInstance.post('/gallery/image' ,formData);
      console.log(result)
      }catch(error){

    }
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("clientEmail", clientEmail);
    formData.append("isMainImage", isMainImage);
    formData.append("file", file);
   console.log("file", file)
    uploadToServer(formData);
  
    // Revoke the object URL after saving
    // if (previewUrl) {
    //   URL.revokeObjectURL(previewUrl);
    // }

    // setCategory("");
    // setClientEmail("");
    // setIsMainImage(false);
    // setFile(null);
    // setPreviewUrl(null);
  };

  const buttonStyle = {
    height: "50px",
    textTransform: "none",
    marginBottom: "16px",
  };

  const chooseFileButtonStyle = {
    height: "50px",
    textTransform: "none",
    marginTop: previewUrl ? "8px" : "16px",
  };

  const clearButtonStyle = {
    height: "50px",
    textTransform: "none",
    marginTop: "8px",
  };

  return (
    <Grid item xs={12} md={9}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload Image
        </Typography>

        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            label="Category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            {options.map((name, index) => {
              return <MenuItem key={index} value={name}>{name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          label="Client Email"
          fullWidth
          value={clientEmail}
          onChange={handleClientEmailChange}
          style={{ marginBottom: "16px" }}
        />

        <div style={{ marginBottom: "16px", position: "relative" }}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            id="imageInput"
          />
          <label htmlFor="imageInput">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={chooseFileButtonStyle}
            >
              {previewUrl ? "Change File" : "Choose a File"}
            </Button>
          </label>

          {previewUrl && (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: "8px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleClearFile}
                style={clearButtonStyle}
              >
                Clear
              </Button>
            </>
          )}
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={isMainImage}
              onChange={handleIsMainImageChange}
              color="primary"
            />
          }
          label="Set as Main Image"
          style={{ marginBottom: "16px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={buttonStyle}
        >
          Save
        </Button>
      </div>
    </Grid>
  );
};

export default ImageUploadForm;
