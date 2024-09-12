import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

function CancelPayment() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    getMessage();
  });

  async function getMessage() {
    try {
        const {data} = await axiosInstance.get("/pay/api/cancel");
            setMessage(data);
        } catch (error) {
            console.error(error);
     }

  }

 
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default CancelPayment;
