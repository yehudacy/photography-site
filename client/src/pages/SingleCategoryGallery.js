import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';





function srcset(image, size, rows = 2, cols = 2) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const SingleCategoryGallery = () => {
  const {category} = useParams();

  const [singleCategoryImages, setSingleCategoryImages] = useState([]);
  
  useEffect(() => {
    const getSingleCategoryImages = async () => {
      try{
        const {data} = await axiosInstance.get(`gallery/${category}`);
        setSingleCategoryImages(data);
      } catch (error) {
        //need to edit the error handling;
        console.log(error)
      }
    }
    getSingleCategoryImages();
  }, [category]);

 

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
      <ImageList
        sx={{ width: '100%', height: '100%' }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {singleCategoryImages.map((item) => (
          
          <ImageListItem key={uniqid()} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default SingleCategoryGallery





