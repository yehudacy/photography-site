import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Clear, AddPhotoAlternate } from "@mui/icons-material";

const btnStyle = { textTransform: "none" };
const CategoryDialog = ({ open, onClose, handleSave, category }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(prev => ({ ...prev, name: category.name, src: category.src }));
      setPreviewImage(category.src);
      setIsEditing(true);
    } else {
      setFormData(f => ({ name: "", src: "" }));
      setPreviewImage(null);
      setIsEditing(false);
    }
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image);
    
    if(previewImage){
      URL.revokeObjectURL(previewImage)
    }
    setFormData( (prev) => {
     return {
      ...prev,
      image: image,
     }
    })
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleImageClear = () => {
    if(previewImage){
      URL.revokeObjectURL(previewImage)
    }
    setPreviewImage(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
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
            fullWidth: true,
            height: previewImage ? "auto" : "200px",
            backgroundColor: previewImage ? "transparent" : "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ddd",
            overflow: "hidden",
          }}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt={formData.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: 16, padding: 2 }}
            >
              No Image Available
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {previewImage && (
            <Button
              variant="contained"
              color="error"
              sx={{ ...btnStyle, m: 1 }}
              onClick={handleImageClear}
            >
              <Clear />
              <Typography
                variant="body2"
                color="inherit"
                sx={{ marginLeft: 1 }}
              >
                Clear Image
              </Typography>
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ ...btnStyle, m: 1 }}
            onClick={
              formData.src
                ? () => document.getElementById("image-input").click()
                : () => document.getElementById("image-input").click()
            }
          >
            <AddPhotoAlternate />
            <Typography variant="body2" color="inherit" sx={{ marginLeft: 1 }}>
              {previewImage ? "Change Image" : "Add Image"}
            </Typography>
          </Button>
        </Box>
        <input
          type="file"
          name="file"
          id="image-input"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={btnStyle}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSave(formData)}
          variant="contained"
          color="primary"
          sx={btnStyle}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;