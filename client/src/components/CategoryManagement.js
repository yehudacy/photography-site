import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import CategoryDialog from "./CategoryDialog";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    AddCircle as AddIcon,
  } from "@mui/icons-material";
const CategoryManagement = () => {
  //link to a library that is passible to hl=ep me with the images
  //https://www.npmjs.com/package/mui-image?activeTab=readme
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/category");
        // console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleClose = () => {
    setDialogOpen(false);
  }
  const handleAdd = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (categoryId) => {
    try{
      const { data } = await axiosInstance.delete(`/category/${categoryId}`);
      setCategories((prev) => {
        return prev.filter((category) => category.category_id !== data.category_id);
      });
    }catch(error){
         // console.log(error);
         setError(`Delete failed please try again`);
    }
  };

  const handleSave = async (categoryData) => {    
    if (selectedCategory) {
      // Edit existing category
      setCategories(
        categories.map((cat) =>
          cat.category_id === selectedCategory.category_id ? categoryData : cat
        )
      );
    } else {
      // Add new category
      try{
        console.log(categoryData);
        
        const { data } = await axiosInstance.post(`/category`, categoryData);
        setCategories([
          ...categories,
          data
        ]);
        setDialogOpen(false);
      }catch(error){
           // console.log(error);
           setError(`Delete failed please try again`);
      }
    }
  };

  return (
    <>
      <Grid
        item
        container
        xs={12}
        md={9}
        sx={{
          margin: "auto",
          padding: "24px",
          textAlign: "center",
          border: "2px solid #ccc",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
          height: "100%",
          width: "100%",
          marginTop: "100px",
        }}
      >
       <Typography
          variant="h5"
          sx={{ marginBottom: "16px", width: "100%", textAlign: "center" }}
        >
          Categories
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={4} key={category.category_id}>
              <Card>
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: '175px',
                    backgroundColor: category.src ? 'transparent' : '#f0f0f0', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd', 
                    overflow: 'hidden', 
                  }}
                >
                  {category.src ? (
                    <img
                      src={category.src}
                      alt={category.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No Image Available
                    </Typography>
                  )}
                </Box>
              </CardContent>
                <CardActions
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={() => handleEdit(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category.category_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <IconButton onClick={handleAdd}>
            <AddIcon sx={{ fontSize: "50px" }} color="primary" />
          </IconButton>
        </Grid>
        <CategoryDialog open={dialogOpen} onClose={handleClose} handleSave={handleSave} category={selectedCategory}/>
      </Grid>
      {error && (
        <Snackbar
          open={Boolean(error)}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CategoryManagement;
