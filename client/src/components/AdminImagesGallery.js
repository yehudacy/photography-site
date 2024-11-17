// AdminImagesGallery.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import AdminImageGrid from "../components/AdminImageGrid";
import ImageLightboxModal from "../components/ImageLightboxModal";
import axiosInstance from "../axiosInstance";

const buttonsStyle = { textTransform: "none" };

const AdminImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mainImageDialogOpen, setMainImageDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axiosInstance.get("/images");
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const handleDeleteClick = (image) => {
    setSelectedImage(image);
    setDeleteDialogOpen(true);
  };

  const handleSetMainClick = (image) => {
    setSelectedImage(image);
    setMainImageDialogOpen(true);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleDelete = async (imageToDelete) => {
    try {
      const { data } = await axiosInstance.delete(
        `/gallery/image/${imageToDelete.image_id}`
      );
      setImages((prev) => prev.filter((img) => img.image_id !== data.image_id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetMainImage = async (imageToSetAsMain) => {
    try {
      const data = await axiosInstance.put(
        `/category/img/${imageToSetAsMain.category_id}`,
        imageToSetAsMain
      );
      // console.log(data);
      setMainImageDialogOpen(false);
      setAlert("success");
      setTimeout(setAlert(null), 4000);
    } catch (error) {
      setMainImageDialogOpen(false);
      setAlert("error");
      setTimeout(setAlert(null), 4000);
    }
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Images Gallery
      </Typography>

      <AdminImageGrid
        images={images}
        onImageClick={handleImageClick}
        onDeleteClick={handleDeleteClick}
        onSetMainClick={handleSetMainClick}
      />

      <ImageLightboxModal
        open={selectedImageIndex !== null}
        images={images}
        selectedImageIndex={selectedImageIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            variant="contained"
            sx={buttonsStyle}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedImage)}
            color="error"
            variant="contained"
            sx={buttonsStyle}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Set Main Image Confirmation Dialog */}
      <Dialog
        open={mainImageDialogOpen}
        onClose={() => setMainImageDialogOpen(false)}
      >
        <DialogTitle>Set as Main Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to set this image as the main image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMainImageDialogOpen(false)}
            color="primary"
            variant="contained"
            sx={buttonsStyle}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSetMainImage(selectedImage)}
            color="primary"
            variant="contained"
            sx={buttonsStyle}
          >
            Set as Main Image
          </Button>
        </DialogActions>
      </Dialog>
      {alert &&
        (alert === "error" ? (
          <Alert severity="error">
            <AlertTitle>{alert}</AlertTitle>
            Main image is not set — <strong>please try again!</strong>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>{alert}</AlertTitle>
            Main image is set — <strong>successfully!</strong>
          </Alert>
        ))}
    </Box>
  );
};

export default AdminImagesGallery;
