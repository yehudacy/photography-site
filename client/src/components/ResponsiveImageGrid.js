import React from 'react';
import { Box, Grid } from '@mui/material';

const ResponsiveImageGrid = ({ 
  images, 
  onImageClick, 
  gridItemProps = {},
  imageStyle = {} 
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid 
            item 
            xs={4}  // 3 images per row
            key={image.id || index}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              },
              ...gridItemProps
            }}
          >
            <img
              src={image.src}
              alt={image.title || `Image ${index + 1}`}
              onClick={() => onImageClick(index)}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                ...imageStyle
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsiveImageGrid;