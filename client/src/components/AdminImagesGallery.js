// AdminImagesGallery.js
import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import AdminImageGrid from '../components/AdminImageGrid';
import ImageLightboxModal from '../components/ImageLightboxModal';
import axiosInstance from '../axiosInstance';

const AdminImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mainImageDialogOpen, setMainImageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axiosInstance.get('/images');        
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

  const handleDelete = () => {
    setImages((prev) => prev.filter((img) => img.id !== selectedImage.id));
    setDeleteDialogOpen(false);
  };

  const handleSetMainImage = () => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isMainImage: img.id === selectedImage.id }))
    );
    setMainImageDialogOpen(false);
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
    <Box sx={{ padding: 2, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Images Gallery
      </Typography>
      
      <AdminImageGrid
        images={images}
        onImageClick={handleImageClick}
        onDeleteClick={handleDeleteClick}
        onSetMainClick={handleSetMainClick}
      />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        open={selectedImageIndex !== null}
        images={images}
        selectedImageIndex={selectedImageIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Set Main Image Confirmation Dialog */}
      <Dialog open={mainImageDialogOpen} onClose={() => setMainImageDialogOpen(false)}>
        <DialogTitle>Set as Main Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to set this image as the main image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMainImageDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSetMainImage} color="primary">Set as Main Image</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminImagesGallery;
