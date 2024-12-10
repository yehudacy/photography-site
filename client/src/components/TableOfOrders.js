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
  Alert,
  AlertTitle,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import axiosInstance from "../axiosInstance";
import { format, parseISO } from "date-fns";

const TableOfOrders = ({ type }) => {
  const { user } = useUser();

  const [orders, setOrders] = useState([]);
  const [fetchOrderError, setFetchOrderError] = useState("");
  const [alert, setAlert] = useState("");


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user.isAdmin) {
          const { data } = await axiosInstance.get("order");
          setOrders(data);
          if (!data.length) {
            setFetchOrderError("no orders found");
          }
        }
        if (!user.isAdmin) {
          const { data } = await axiosInstance.get(
            `order/client/${user.client_id}`
          );
          // console.log(data)
          setOrders(data);
          if (!data.length) {
            setFetchOrderError("no orders found");
          }
        }
      } catch (error) {
        setFetchOrderError(error.message);
      }
    };
    fetchOrders();
  }, [user.client_id, user.isAdmin]);

  const handleSelectOrder = () => {};

  const handleDelete = async (orderId) => {
    try {
      const { data } = await axiosInstance.delete(`/order/${orderId}`);
      // console.log(data);
      const filteredOrders = orders.filter(
        (order) => order.order_id !== orderId
      );
      setOrders(filteredOrders);
    } catch (error) {
      console.log(error);
      setAlert("error");
      setTimeout(() => setAlert(""), 5000);
    }
  };

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
              <TableCell>Delete</TableCell>
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
                  <TableCell>
                    {format(parseISO(order.order_date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(order.action_date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.remarks}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {/* <IconButton>
                      <EditIcon />
                    </IconButton> */}
                    <IconButton onClick={() => handleDelete(order.order_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="h6" color="error">
                    {fetchOrderError}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {alert && (
        <Alert severity="error">
          <AlertTitle>{alert}</AlertTitle>
          delete not completed — <strong>please try again!</strong>
        </Alert>
      )}
    </Grid>
  );
};

export default TableOfOrders;
