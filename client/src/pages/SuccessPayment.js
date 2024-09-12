import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useSearchParams } from "react-router-dom";

function SuccessPayment() {
  const [message, setMessage] = useState("-");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    async function sendPaypalParams() {        
        const payerId = searchParams.get("PayerID");
        const paymentId = searchParams.get("paymentId");
        const { data } = await axiosInstance.post("/pay/api/success", {
          payerId,
          paymentId,
        });
        return data;
    }
    (async () => {
        const data = await sendPaypalParams();
        if (data.state === 'approved') {
          setMessage('Your payment has been approved thanks for paying through the website!');
        }
      })();
  }, [searchParams]);


  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default SuccessPayment;
