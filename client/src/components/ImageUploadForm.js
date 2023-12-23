import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
} from '@mui/material';

const ImageUploadForm = () => {
    const [category, setCategory] = useState('');
    const [clientName, setClientName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isMainImage, setIsMainImage] = useState(false);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleClientNameChange = (event) => {
        setClientName(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleIsMainImageChange = (event) => {
        setIsMainImage(event.target.checked);
    };

    const handleSave = () => {
        // Add logic to save the image details to the database
        // You can send an API request or perform any other data handling here
        console.log('Image details saved:', {
            category,
            clientName,
            imageUrl,
            isMainImage,
        });

        // Clear the form after saving
        setCategory('');
        setClientName('');
        setImageUrl('');
        setIsMainImage(false);
    };

    return (
        <Grid item xs={12} md={9}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>

      <FormControl fullWidth style={{ marginBottom: '16px' }}>
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
        style={{ marginBottom: '16px' }}
      />

      <TextField
        label="Image URL"
        fullWidth
        value={imageUrl}
        onChange={handleImageUrlChange}
        style={{ marginBottom: '16px' }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isMainImage}
            onChange={handleIsMainImageChange}
            color="primary"
          />
        }
        label="Set as Main Image"
        style={{ marginBottom: '16px' }}
      />

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
        </Grid>
    );
};

export default ImageUploadForm;
