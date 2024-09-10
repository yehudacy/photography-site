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
  Alert,
  AlertTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../axiosInstance";

const ContactRequestsTable = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [contactMeErrorMsg, setContactMeErrorMsg] = useState("");

  useEffect(() => {
    const fetchAllContactMe = async () => {
      try {
        const { data } = await axiosInstance.get("/contactme");
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

  const onDelete = async (index) => {
    try {
      const { data } = await axiosInstance.delete(`/contactme/${contactRequests[index].contact_me_id}`);
      let newArr = [...contactRequests];
      const filteredArr = newArr.filter((item) => {
        return !(item.contact_me_id === contactRequests[index].contact_me_id)
      });
      console.log(filteredArr)
      if (!filteredArr.length) {
        setContactMeErrorMsg("No contact me requests to be found");
      }
      setContactRequests(filteredArr);
    } catch (error) {
      setContactMeErrorMsg(error.message);
      setTimeout(() => {
        setContactMeErrorMsg("")
      console.log(error)
    }, 6000)
  }
};

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
            <TableCell style={{ width: "10%" }}>Delete</TableCell>
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
                  {contactMeErrorMsg}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {(contactMeErrorMsg && contactRequests.length > 0) &&
            <TableRow>
              <TableCell colSpan={5}>
                <Alert severity="error">
                  <AlertTitle>{"ERROR"}</AlertTitle>
                  {contactMeErrorMsg}<strong>please try again!</strong>
                </Alert>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
);
};

export default ContactRequestsTable;
