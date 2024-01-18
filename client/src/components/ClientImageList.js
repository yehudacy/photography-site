import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useUser } from "../hooks/useUser";
import axiosInstance from "../axiosInstance";

const ClientImageList = () => {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchClientImages = async () => {
      try {
        const { data } = await axiosInstance.get(`/images/${user.client_id}`);
        // console.log(data);
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientImages();
  }, [user]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleNavigate = (direction) => {
    const currentIndex = images.findIndex(
      (image) => image.id === selectedImage.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }

    setSelectedImage(images[newIndex]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={9} sx={{ padding: "16px" }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: "16px" }}>
        Your Images
      </Typography>

      {!images.length && (
        <Typography variant="h5" sx={{ textAlign: "center", color: "red" }}>
          No images found for this user
        </Typography>
      )}
      <ImageList cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem
            key={image.image_id}
            onClick={() => handleImageClick(image)}
          >
            <img        
              src={image.src}
              alt={image.alt}
              style={{ cursor: "pointer" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {selectedImage && (
          <>
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
              }}
              onClick={() => handleNavigate("prev")}
            >
              <ChevronLeft />
            </IconButton>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
              }}
              onClick={() => handleNavigate("next")}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Dialog>
    </Grid>
  );
};

export default ClientImageList;
