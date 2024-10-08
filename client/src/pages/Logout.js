import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const LogoutDialog = () => {
    const { logoutUser } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const onClose =  () => {
        setOpen(false);
        navigate(-1);
    } 


    const onLogout =  () => {
        logoutUser();
        axiosInstance.defaults.headers.common["Authorization"] = null;
        setOpen(false);
        navigate('/login', {replace:true});
    } 

    const buttonStyle = {
        textTransform: 'none'
    }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={buttonStyle}>Cancel</Button>
        <Button onClick={onLogout} variant="contained" color="primary" style={buttonStyle}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
