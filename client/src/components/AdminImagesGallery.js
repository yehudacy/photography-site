import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { Close as CloseIcon } from '@mui/icons-material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import axiosInstance from '../axiosInstance';


const AdminImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mainImageDialogOpen, setMainImageDialogOpen] = useState(false);
  const [fullscreenDialogOpen, setFullscreenDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const {data} = await axiosInstance.get('/images');
        console.log('data', data);
        setImages(data);
      } catch (err) {
        console.error(`Error! ${err}`);
      };
    }
    fetchAllImages();
  }, []);


  const handleDelete = () => {
    // Handle delete logic (remove the selected image from the state)
    setImages((prevImages) => prevImages.filter((img) => img.id !== selectedImage.id));

    // Close the delete confirmation dialog
    setDeleteDialogOpen(false);
  };

  const handleSetMainImage = () => {
    // Handle set main image logic (update the selected image as the main image in the state)
    setImages((prevImages) =>
      prevImages.map((img) => ({
        ...img,
        isMainImage: img.id === selectedImage.id ? true : img.isMainImage,
      }))
    );

    // Close the set main image confirmation dialog
    setMainImageDialogOpen(false);
  };

  const handleClose = () => {
    setFullscreenDialogOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setFullscreenDialogOpen(true);
  };


  const handleOpenFullscreenDialog = () => {
    setFullscreenDialogOpen(true);
  };

  const handleCloseFullscreenDialog = () => {
    setFullscreenDialogOpen(false);
  };

  const handleNavigate = (direction) => {
    const currentIndex = images.findIndex((image) => image.image_id === selectedImage.image_id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }

    setSelectedImage(images[newIndex]);
  };

  const buttonStyle = {
    height: '50px', // Adjust the height as needed
    textTransform: 'none', // Ensure lowercase text
  };

  return (
    <Grid container item xs={12} md={9} spacing={2} sx={{ padding: 2, justifyContent: 'center', alignItems: 'center', mt: 1 }}>
      {images.map((image) => (
        <Grid item xs={12} md={6} key={image.image_id}>
          <Card>
            <CardMedia
              component="img"
              alt={image.altText}
              height="300"
              image={image.src}
              onClick={() => { handleImageClick(image) }}
            />
            <Grid container item sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", p: 0.5 }}>
            <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: '#3f51b5',
                  width: 80,
                  padding: 1,
                  borderRadius: 1, 
                  '&:hover': {
                    backgroundColor: '#3f51b5',
                  },
                }}
                style={buttonStyle}
                onClick={() => {
                  setSelectedImage(image);
                  setDeleteDialogOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Button
                sx={{
                  color: 'white',
                  backgroundColor: '#3f51b5',
                  padding: 1,
                  '&:hover': {
                    backgroundColor: '#3f51b5',
                  },
                }}
                onClick={() => {
                  setSelectedImage(image);
                  setMainImageDialogOpen(true);
                }}
                style={buttonStyle}
              >
                <StarIcon />
                Set as Main Image
              </Button>
            </Grid>
          </Card>
        </Grid>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} style={buttonStyle}>Cancel</Button>
          <Button color="error" onClick={handleDelete} style={buttonStyle}>
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
          <Button onClick={() => setMainImageDialogOpen(false)} style={buttonStyle}>Cancel</Button>
          <Button onClick={handleSetMainImage} style={buttonStyle}>Set as Main Image</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={fullscreenDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {selectedImage && (
          <>
            <IconButton
              sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)' }}
              onClick={() => handleNavigate('prev')}
            >
              <ChevronLeft />
            </IconButton>
            <img
              src={selectedImage.src}
              alt={""}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />

            <IconButton
              sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)' }}
              onClick={() => handleNavigate('next')}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Dialog>
    </Grid>
  );
};

export default AdminImagesGallery;
