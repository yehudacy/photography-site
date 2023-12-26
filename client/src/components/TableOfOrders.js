import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const TableOfOrders = ({ type }) => {
  const [orders, setOrders] = useState([]);
  const [fetchOrderError, setFetchOrderError] = useState("");

  const fetchOrders = async (type) => {
    try {
      if (type === "admin") {
        const { data } = await axiosInstance.get("order");
        setOrders(data);
        if(!data.length){
          setFetchOrderError("no orders found");
        }
      }
      if (type === "client") {
        const { data } = await axiosInstance.get("order/client/1");
        // console.log(data)
        setOrders(data);
        if(!data.length){
          setFetchOrderError("no orders found");
        }
      }
    } catch (error) {
      setFetchOrderError(error.message);
    }
  };

  useEffect(() => {
    type === "admin" && fetchOrders(type);
    type === "client" && fetchOrders(type);
    // fetchOrders()
  }, [type]);

  const handleSelectOrder = () => {};

  return (
    <Grid item xs={12} md={9}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Action Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order.order_id}
                  onClick={() => handleSelectOrder(order)}
                >
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.client_id}</TableCell>
                  <TableCell>{order.order_date}</TableCell>
                  <TableCell>{order.action_date}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.remarks}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DetailsIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                <Typography variant="h6" color="error">
                    { fetchOrderError }
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

export default TableOfOrders;
