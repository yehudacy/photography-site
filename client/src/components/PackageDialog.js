import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";

const flexCenterStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const btnStyle = { textTransform: "none" };

const PackageDialog = ({ open, handleClose, handleSave, currentPackage }) => {
  const [packageDetails, setPackageDetails] = useState({
    button_variant: "contained",
    currency: "ILS",
  });
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (currentPackage) {
      setPackageDetails(currentPackage[0]);
      setIsNew(false);
    }
  }, [currentPackage]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === "price") {
      value = Number(value);
    }
    setPackageDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{!isNew ? "Update" : "New"} Package Details</DialogTitle>
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
          value={packageDetails?.title || ""}
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
          value={packageDetails?.price || ""}
          onChange={handleInputChange}
        />
        <Tooltip arrow title="Please enter the details of the package and separate them with a comma(,)!">
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
            onChange={handleInputChange}
          />
        </Tooltip>
        <TextField
          autoFocus
          required
          margin="dense"
          id="variant"
          name="button_variant"
          label="Button Variant"
          select
          value={packageDetails?.button_variant || "contained"}
          sx={{ width: "49%", marginRight: "1%" }}
          variant="outlined"
          onChange={handleInputChange}
        >
          <MenuItem value="contained" sx={flexCenterStyle}>
            <Button variant="contained" sx={btnStyle}>
              Contained
            </Button>
          </MenuItem>
          <MenuItem value="outlined" sx={flexCenterStyle}>
            <Button variant="outlined" sx={btnStyle}>
              Outlined
            </Button>
          </MenuItem>
        </TextField>
        <TextField
          autoFocus
          required
          margin="dense"
          id="currency"
          name="currency"
          label="currency"
          select
          value={packageDetails?.currency || "ILS"}
          sx={{ width: "49%", marginLeft: "1%" }}
          variant="outlined"
          onChange={handleInputChange}
        >
          <MenuItem value="USD" sx={flexCenterStyle}>
            <Button variant="text" sx={btnStyle}>
              USD
            </Button>
          </MenuItem>
          <MenuItem value="ILS" sx={flexCenterStyle}>
            <Button variant="text" sx={btnStyle}>
              ILS
            </Button>
          </MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={flexCenterStyle}>
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={() => handleSave(isNew, packageDetails)}
        >
          {!isNew ? "update" : "save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageDialog;
