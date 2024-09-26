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
import { useCallback, useEffect, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";

const menuItemStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'};
const btnStyle = {textTransform: 'none'};

const PackageDialog = ({ open, handleClose, handleSave, currentPackage }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [packageDetails, setPackageDetails] = useState({
    
  });

  useEffect(() => {
    if (currentPackage) {
      setPackageDetails((prev) => {
        console.log(prev);
        console.log(currentPackage);
        return currentPackage[0]
      })
    }
  }, [currentPackage]);

  useEffect(() => {
    console.log('packageDetails state:', packageDetails);
  }, [packageDetails]);

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackageDetails((prev) => ({ ...prev, [name]: value }));
  };

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
      {updated && <DialogContent>
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
          value={packageDetails?.title || ""}
          // defaultValue={packageDetails?.title}
          onChange={handleInputChange} 
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
          value={packageDetails?.price || null}
          // defaultValue={packageDetails?.price}
          onChange={handleInputChange} 
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
          value={packageDetails?.details || ""}
          // defaultValue={packageDetails?.details}
          onChange={handleInputChange} 
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="variant"
          name="button_variant"
          label="Button Variant"
          select
          slotProps={{
            select: {
              native: true,
            },
          }}
          value={packageDetails?.button_variant || "contained"}
          // defaultValue={packageDetails.button_variant}
          fullWidth
          variant="outlined"
          onChange={handleInputChange} 
        >
          <MenuItem value="contained" sx={menuItemStyle}>
            <Button variant="contained" sx={btnStyle}>Contained</Button>
          </MenuItem>
          <MenuItem value="outlined" sx={menuItemStyle}>
            <Button variant="outlined" sx={btnStyle}>Outlined</Button>
          </MenuItem>
        </TextField>
      </DialogContent>}
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default PackageDialog;
