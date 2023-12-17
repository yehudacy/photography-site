import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { Navigate, useLocation } from "react-router-dom";

const Order = () => {
  const { state} = useLocation();
  

  const [orderDate] = useState(dayjs());
  const [actionDate, setActionDate] = useState(dayjs());
  const [time, setTime] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  const [price] = useState(state?.packagePrice);
  const [remarks, setRemarks] = useState("");
  if(!state)  {
    return <Navigate to={'/pricing'}/>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" align="center" mb={2}>
              Order details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} md={6}>
                  
                </Grid> */}
                <Grid item  xs={12} md={6} sx={{m: 'auto'}} >
                  {/* <TextField
                    fullWidth
                    label="Order Date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    margin="normal"
                    required
                  /> */}
                  {/* <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                    required
                  /> */}
                  <DatePicker 
                    sx={{width: '100%', marginY: 2}}
                    label='order date'
                    value={orderDate}
                    readOnly
                  />
                  <DatePicker 
                    sx={{width: '100%', marginY: 2}}
                    label='action date'
                    disablePast
                    value={actionDate}
                    onChange={(newDate) => setActionDate(newDate)}
                  />
                   <TimePicker
                    sx={{width: '100%', marginY: 2}}
                    label="execution time"
                    ampm={false}
                    disablePast
                    value={time}
                    onChange={(newTime) =>  setTime(newTime)}
                  />
                  {/* <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    type="email"
                  /> */}
                  <TextField
                    fullWidth
                    label="Price"
                    value={`${price} NIS`}
                    // onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    type="text"
                  />
                  <TextField
                    fullWidth
                    label="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                  />
                  <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
                    Place order
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Order