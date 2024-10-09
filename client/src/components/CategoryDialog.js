import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Box, Typography } from '@mui/material';
import { Clear, AddPhotoAlternate } from '@mui/icons-material';


const btnStyle = {textTransform: 'none'};
const CategoryDialog = ({ open, onClose, handleSave, category }) => {
  const [formData, setFormData] = useState({
    name:  '',
    src: '',
  });

  useEffect(() => {
    console.log(category);
    setFormData((prev) => {
        return {
            ...prev,
            name: category?.name || '',
            src: category?.src || '',
            }
    })
  }, [category])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, src: e.target.value });
  };

  const handleImageClear = () => {
    setFormData({ ...formData, src: '' });
  };
//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Category Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
         <Box
          sx={{
            width: '100%',
            height: '175px',
            backgroundColor: formData.src ? 'transparent' : '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ddd',
            overflow: 'hidden',
          }}
        >
          {formData.src ? (
            <img
              src={formData.src}
              alt={formData.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              No Image Available
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {formData.src && (
            <Button
              variant="contained"
              color="error"
              sx={{...btnStyle, m : 1}}
              onClick={handleImageClear}
            >
              <Clear />
              <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
                Clear
              </Typography>
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{...btnStyle, m : 1}}
            onClick={formData.src ? () => document.getElementById('image-input').click() : () => document.getElementById('image-input').click()}
          >
            <AddPhotoAlternate />
            <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
              {formData.src ? 'Change Image' : 'Add Image'}
            </Typography>
          </Button>
        </Box>
          <input
            type="file"
            id="image-input"
            style={{ display: 'none' }}
            onChange={(e) => handleImageChange(e)}
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color="primary" sx={btnStyle}>
          Cancel
        </Button>
        <Button onClick={() => handleSave(formData)} variant='contained' color="primary" sx={btnStyle}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;

{/* <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
{formData.src && (
  <Button
    variant="contained"
    color="error"
    onClick={handleImageClear}
  >
    <Clear />
    <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
      Clear
    </Typography>
  </Button>
)}
<Button
  variant="contained"
  color="primary"
  onClick={formData.src ? () => document.getElementById('image-input').click() : () => document.getElementById('image-input').click()}
>
  <AddPhotoAlternate />
  <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
    {formData.src ? 'Change Image' : 'Add Image'}
  </Typography>
</Button>
</Box> */}