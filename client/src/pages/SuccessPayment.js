import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";

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

  return (
    <>
      {!isProcessed && (
        <Dialog open={!isProcessed}>
          <DialogTitle>Processing...</DialogTitle>
          <DialogContent>
            <LinearProgress />
          </DialogContent>
        </Dialog>
      )}
      {isProcessed && (
        <Dialog open={isProcessed}>
          <DialogContent>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              {message}
            </Alert>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default SuccessPayment;
