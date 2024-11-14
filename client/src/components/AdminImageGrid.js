import React from 'react';
import { Grid, Card, CardMedia, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { Close as CloseIcon } from '@mui/icons-material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const AdminImageGrid = ({
  images,
  onImageClick,
  onDeleteClick,
  onSetMainClick,
  openFullscreen,
  selectedImage,
  handleCloseFullscreen,
  handleNavigate,
  gridItemProps = {},
  imageStyle = {} 
}) => (
  <>
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
            <Card>
            <CardMedia
              component="img"
              image={image.src}
              alt={image.altText || "Image"}
              height="250"
              onClick={() => onImageClick(index)}
            />
            <Grid container justifyContent="space-between" sx={{ p: 1 }}>
              <IconButton
                onClick={() => onDeleteClick(image)}
                sx={{ color: 'white', backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
              >
                <DeleteIcon />
              </IconButton>
              <Button
                onClick={() => onSetMainClick(image)}
                sx={{ color: 'white', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                startIcon={<StarIcon />}
              >
                Set as Main
              </Button>
            </Grid>
          </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
{/* 
    <Card>
            <CardMedia
              component="img"
              image={image.src}
              alt={image.altText || "Image"}
              height="250"
              onClick={() => onImageClick(index)}
            />
            <Grid container justifyContent="space-between" sx={{ p: 1 }}>
              <IconButton
                onClick={() => onDeleteClick(image)}
                sx={{ color: 'white', backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
              >
                <DeleteIcon />
              </IconButton>
              <Button
                onClick={() => onSetMainClick(image)}
                sx={{ color: 'white', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                startIcon={<StarIcon />}
              >
                Set as Main
              </Button>
            </Grid>
          </Card> */}

    <Dialog open={openFullscreen} onClose={handleCloseFullscreen} maxWidth="md" fullWidth>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseFullscreen}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      {selectedImage && (
        <>
          <IconButton
            onClick={() => handleNavigate('prev')}
            sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)' }}
          >
            <ChevronLeft />
          </IconButton>
          <img
            src={selectedImage.src}
            alt={selectedImage.altText || ""}
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
          <IconButton
            onClick={() => handleNavigate('next')}
            sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Dialog>
  </>
);

export default AdminImageGrid;
