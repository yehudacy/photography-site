import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import eventEmitter from "../utils/eventEmitter";

const JobCard = ({ job, onClick }) => {
  const [jobImage, setJobImage] = useState(null);
  useEffect(() => {
    const fetchJobImage = async (jobImageId) => {
      try {
        const { data } = await axiosInstance.get(
         `/gallery/jobs/mainimg/${jobImageId}`
        );
        setJobImage(data); 
      } catch (error) {
        console.log("Error fetching job image:", error); 
      }
    };
  
    const handleMainImageUpdate = async () => {
      try {
        const { data } = await axiosInstance.get(`/gallery/jobs/mainImg/${job.job_image_id}`); 
        const newMainImageId = data.job_image_id; 
  
        // Log to verify if this function is being called
        console.log("handleMainImageUpdate called with newMainImageId:", newMainImageId); 
  
        fetchJobImage(newMainImageId); 
      } catch (error) {
        console.log("Error fetching main image ID:", error);
      }
    };
  
    const fetchAndDisplayMainImage = async () => {
      try {
        const { data } = await axiosInstance.get(`/gallery/jobs/mainImg/${job.job_image_id}`); 
        const initialMainImageId = data.job_image_id; 
        fetchJobImage(initialMainImageId); 
      } catch (error) {
        console.log("Error fetching initial main image ID:", error);
      }
    };
  
    fetchAndDisplayMainImage(); 
  
    eventEmitter.on("mainImageUpdated", handleMainImageUpdate);
  
    return () => {
      eventEmitter.off("mainImageUpdated", handleMainImageUpdate);
    };
  }, [job]);
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.005)",
          boxShadow: 3,
        },
      }}
      elevation={1}
    >
      <CardActionArea>
        <CardContent
          sx={{
            flexGrow: 1,
            backgroundColor: "#e6f2ff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">{job.title}</Typography>
          <Box
            sx={{
              width: "100%",
              height: "175px",
              backgroundColor: job.src ? "transparent" : "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
              overflow: "hidden",
              borderRadius: 3,
            }}
          >
            {jobImage ? (
              <img
                src={jobImage.src}
                alt={job.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Image Available
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;
