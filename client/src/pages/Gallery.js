import { useEffect, useState } from "react";
import axiosInstance from '../axiosInstance';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [categoryImages, setCategoryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategoryImages();
  }, []);

  const getCategoryImages = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('gallery');
      setCategoryImages(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container maxWidth="xl" disableGutters sx={{ 
      width: '100%', 
      px: { xs: 1, sm: 2, md: 3 } 
    }}>
      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        {categoryImages.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.category_id} sx={{ p: 1 }}>
            <Card 
              component={Link} 
              to={`${item.name}`} 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                borderRadius: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)', 
                  boxShadow: 3, 
                }
              }}
              elevation={1}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${item.src}?w=248&fit=crop&auto=format`}
                alt={item.name}
                sx={{ 
                  objectFit: 'cover',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                backgroundColor: '#e6f2ff', 
                borderBottomLeftRadius: 12, 
                borderBottomRightRadius: 12,
              }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}