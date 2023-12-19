import { useEffect, useState } from "react";
import axiosInstance from '../axiosInstance';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [categoryImages, setCategoryImages] = useState([]);

  useEffect(() => {
    getCategoryImages();
  }, []);

  const getCategoryImages = async () => {
    try{
      const {data} = await axiosInstance.get('gallery');
      console.log(data)
      setCategoryImages(data)
    } catch (error) {
      //need to edit the error handling
      console.log(error);
    }
  } 
  return (
    <Box
      sx={{
        marginX: "auto",
        boxSizing: 'content-box',
        display: "flex",    
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ImageList sx={{ width: "100%", height: "100%" }} cols={4}>
        
        {categoryImages.map((item) => (
          <ImageListItem key={item.category_id}
          component={Link}
          to={`${item.name}`}
          // state={{categoryId: item.categoryId}}
          >
            <img
              srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}


