import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SuccessPayment() {
  const [message] = useState("The purchase failed please try again!");
  const [isError, setIsError] = useState(true);

  const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setIsError(false);
            navigate('/pricing');
        }, 4000)
    }, [navigate])
  

  return (
    <>
      {isError &&
        <Dialog open={isError}>
          <DialogContent>
            <Alert severity={isError && 'error'}>
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          </DialogContent>
        </Dialog>
      }
    </>
  );
}

export default SuccessPayment;
