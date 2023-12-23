import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactRequestsTable = () => {
    // Assuming contactRequests is an array of objects with properties: name, phoneNumber, email, message
    const [contactRequests, setContactRequests] = useState(
        [
            { name: "yehuda", phoneNumber: "0527183008", email: "yc0527183008@gmail.com", message: "this ia a contact me request" },
            { name: "yehuda", phoneNumber: "0527183008", email: "yc0527183008@gmail.com", message: "this ia a contact me request" },
            { name: "yehuda", phoneNumber: "0527183008", email: "yc0527183008@gmail.com", message: "this ia a contact me request" },
            { name: "yehuda", phoneNumber: "0527183008", email: "yc0527183008@gmail.com", message: "this ia a contact me request" }
        ]
    );

    const onDelete = () => {

    }

    return (
        <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
                contact me requests
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '20%' }}>Name</TableCell>
                            <TableCell style={{ width: '20%' }}>Phone Number</TableCell>
                            <TableCell style={{ width: '20%' }}>Email</TableCell>
                            <TableCell style={{ width: '30%' }}>Message</TableCell>
                            <TableCell style={{ width: '10%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactRequests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.phoneNumber}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.message}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onDelete(index)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default ContactRequestsTable;
