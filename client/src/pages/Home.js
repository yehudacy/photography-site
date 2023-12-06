import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { red, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';

//colors
const primary = red['A100'];
const secondary = purple[500];

const Home = () => {
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: primary
    }}>
        <Typography>
            Welcome to the home page!
        </Typography>
        <Link to={'/galery'}>
            <Button variant='contained' sx={{bgcolor: secondary, m: 2}}>
                Galery
            </Button>
        </Link>
    </Box>
  )
}

export default Home