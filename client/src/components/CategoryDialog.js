import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';


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
        <TextField
          margin="dense"
          name="src"
          label="Image URL"
          type="text"
          fullWidth
          value={formData.src}
          onChange={handleChange}
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