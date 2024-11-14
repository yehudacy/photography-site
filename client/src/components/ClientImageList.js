import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";
import axiosInstance from "../axiosInstance";
import ResponsiveImageGrid from './ResponsiveImageGrid';
import ImageLightboxModal from './ImageLightboxModal';

const ClientImageList = () => {
  const { user } = useUser ();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchClientImages = async () => {
      try {
        const { data } = await axiosInstance.get(`/images/${user.client_id}`);
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientImages();
  }, [user]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    setSelectedImage((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setSelectedImage((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
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

      <ResponsiveImageGrid 
        images={images} 
        onImageClick={handleImageClick} 
      />

      <ImageLightboxModal
        open={selectedImage !== null}
        images={images}
        selectedImageIndex={selectedImage}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </Grid>
  );
};

export default ClientImageList;