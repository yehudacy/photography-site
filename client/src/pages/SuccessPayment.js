import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function SuccessPayment() {
  const [message, setMessage] = useState("");
  const [isProcessed, setIsProcessed] = useState(false);
  const [searchParams] = useSearchParams();
  const { orderId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function sendPaypalParams() {
      const payerId = searchParams.get("PayerID");
      const paymentId = searchParams.get("paymentId");
      const { data } = await axiosInstance.post("/pay/api/success", {
        payerId,
        paymentId,
        orderId,
      });
      return data;
    }
    (async () => {
      try {
        const data = await sendPaypalParams();
        if (data?.payment.state === "approved") {
          setMessage(
            "Your payment has been approved thanks for paying through the website!"
          );
          setIsProcessed(true);
          setTimeout(() => {
            navigate("/client?orders");
          }, 4500);
        }
      } catch (error) {
        setMessage("The payment failed for some reason please try again");
      }
    })();
  }, [searchParams, orderId, navigate]);

  return <>{isProcessed && <h1>{message}</h1>}</>;
}

export default SuccessPayment;
