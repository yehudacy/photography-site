import React, { useState } from "react";
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

const ImageUploadForm = ({ uploadToServer }) => {
  const [category, setCategory] = useState("");
  const [clientName, setClientName] = useState("");
  const [isMainImage, setIsMainImage] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
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

  const handleSave = () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("clientName", clientName);
    formData.append("isMainImage", isMainImage);
    formData.append("file", file);

    uploadToServer(formData);

    // Revoke the object URL after saving
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setCategory("");
    setClientName("");
    setIsMainImage(false);
    setFile(null);
    setPreviewUrl(null);
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
    // backgroundColor: "transparent", // Set background color to transparent
    // color: "#1976D2", // Set text color
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
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
            <MenuItem value="option4">Option 4</MenuItem>
            <MenuItem value="option5">Option 5</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Client Name"
          fullWidth
          value={clientName}
          onChange={handleClientNameChange}
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
