// // Payment.js

// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
//   const initialOptions = {
//     "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
//     "disable-funding": "", 
//   };

//   const [message, setMessage] = useState("");

//   const createOrder = async () => {
//     // Implement your server logic to create a PayPal order
//     // You can use your Node.js server to make an API call to PayPal
//     // and return the order ID.
//     // Example:
//     // const response = await fetch("/api/orders", { method: "POST" });
//     // const orderData = await response.json();
//     // return orderData.id;

//     // For testing purposes, you can return a static order ID.
//     return 5;
//   };

//   const onApprove = async (data, actions) => {
//     // Implement your server logic to capture the PayPal payment
//     // Example:
//     // const response = await fetch(`/api/orders/${data.orderID}/capture`, { method: "POST" });
//     // const orderData = await response.json();

//     // For testing purposes, you can show a success message.
//     setMessage("Payment successful!");
//   };

//   return (
//     <div className="App">
//       <PayPalScriptProvider options={initialOptions}>
//         <PayPalButtons
//           style={{
//             shape: "rect",
//             layout: "vertical",
//           }}
//           createOrder={createOrder}
//           onApprove={onApprove}
//         />
//       </PayPalScriptProvider>
//       <p>{message}</p>
//     </div>
//   );
}

export default Payment;
