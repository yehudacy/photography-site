import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";

const menuItemStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'};
const btnStyle = {textTransform: 'none'};

const PackageDialog = ({ open, handleClose, handleSave, currentPackage }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [packageDetails, setPackageDetails] = useState({
    package_id: "",
    title: "",
    price: "",
    details: "",
    variant: "contained",
  });

  useEffect(() => {
    console.log(currentPackage);
    if (currentPackage) {
      setPackageDetails((prev) => currentPackage);
    }
  }, [currentPackage]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Package Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Package Title"
          type="text"
          fullWidth
          variant="outlined"
          value={packageDetails.title}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="price"
          name="price"
          label="Package Price"
          type="number"
          fullWidth
          variant="outlined"
          value={packageDetails.price}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="details"
          name="details"
          label="Package details"
          type="text"
          placeholder="Please enter comma(,) separated details"
          multiline
          fullWidth
          variant="outlined"
          value={packageDetails.details}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="variant"
          name="contained"
          label="Button Variant"
          select
          slotProps={{
            select: {
              native: true,
            },
          }}
          multiline
          value={packageDetails.variant}
          fullWidth
          variant="outlined"
        >
          <MenuItem selected value={"contained"} sx={menuItemStyle}>
            <Button variant="contained" sx={btnStyle}>Contained</Button>
          </MenuItem>
          <MenuItem value={"outlined"} sx={menuItemStyle}>
            <Button variant="outlined" sx={btnStyle}>Outlined</Button>
          </MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default PackageDialog;
