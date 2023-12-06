
import React from 'react';
import {Link} from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material';
import {  cyan } from '@mui/material/colors';


const primary = cyan[200]; // #f44336

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to={"/"} replace><Button variant="contained">Back Home</Button></Link>
    </Box>
  )
}

export default NotFound;
