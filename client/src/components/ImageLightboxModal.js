import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton 
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const ImageLightboxModal = ({ 
  open, 
  images, 
  selectedImageIndex, 
  onClose, 
  onNext, 
  onPrev 
}) => {  
  if (selectedImageIndex === null) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent 
        sx={{ 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 0,
          backgroundColor: 'rgba(0,0,0,0.9)'
        }}
      >
        <IconButton
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 10,
            color: 'white'
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <img
          src={images[selectedImageIndex].src}
          alt={images[selectedImageIndex].title || `Image ${selectedImageIndex + 1}`}
          style={{
            maxWidth: '95%',
            maxHeight: '95vh',
            objectFit: 'contain'
          }}
        />

        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 10,
            color: 'white'
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightboxModal;