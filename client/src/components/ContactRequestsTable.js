import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../axiosInstance";

const ContactRequestsTable = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [contactMeErrorMsg, setContactMeErrorMsg] = useState("");

  useEffect(() => {
    const fetchAllContactMe = async () => {
      try {
        const {data} = await axiosInstance.get("/contactme");
        if (data.length === 0) {
          setContactMeErrorMsg("No contact me requests to be found");
        }
        setContactRequests(data);
      } catch (error) {
        console.log(error);
        setContactMeErrorMsg("Error fetching contact me requests");
      }
    };
    fetchAllContactMe();
  }, []);

  const onDelete = () => {};

  return (
    <Grid item xs={12} md={9}>
      <Typography variant="h4" gutterBottom>
        Contact Me Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Name</TableCell>
              <TableCell style={{ width: "20%" }}>Phone Number</TableCell>
              <TableCell style={{ width: "20%" }}>Email</TableCell>
              <TableCell style={{ width: "30%" }}>Message</TableCell>
              <TableCell style={{ width: "10%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactRequests.length > 0 ? (
              contactRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.phone_number}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.message}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onDelete(index)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="h6" color="error">
                    {contactMeErrorMsg }
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ContactRequestsTable;
