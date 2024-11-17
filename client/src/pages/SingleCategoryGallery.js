import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import ResponsiveImageGrid from '../components/ResponsiveImageGrid';
import ImageLightboxModal from '../components/ImageLightboxModal';

const SingleCategoryGallery = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axiosInstance.get(`gallery/${category}`);        
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [category]);

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
    <>
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
    </>
  );
};

export default SingleCategoryGallery;