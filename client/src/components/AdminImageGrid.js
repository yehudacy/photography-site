import React from "react";
import { Grid, Card, CardMedia, IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

const AdminImageGrid = ({
  images,
  onImageClick,
  onDeleteClick,
  onSetMainClick,
  gridItemProps = {},
  imageStyle = {},
}) => (
  <>
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid
            item
            xs={4}
            key={image.id || index}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              ...gridItemProps,
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
              <Grid
                container
                justifyContent="space-between"
                sx={{ p: 1, backgroundColor: "#e6f2ff" }}
              >
                <IconButton
                  onClick={() => onDeleteClick(image)}
                  sx={{
                    color: "white",
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "error.dark" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  onClick={() => onSetMainClick(image)}
                  sx={{
                    color: "white",
                    backgroundColor: "#3fb1d3",
                    "&:hover": { backgroundColor: "primary.main" },
                  }}
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
  </>
);

export default AdminImageGrid;
