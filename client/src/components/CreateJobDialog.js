import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { btnTextTransformNone } from "../utils/utilityVars";
import { Close as CloseIcon, Height } from "@mui/icons-material";

const CreateJobDialog = ({ dialogOpen, handleCloseDialog, handleSaveJob }) => {
  const [newJobTitle, setNewJobTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Create a New Job</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ minWidth: "350px" }}>
        <TextField
          id="new-job"
          label="Job Title"
          margin="dense"
          variant="outlined"
          value={newJobTitle}
          onChange={(e) => setNewJobTitle(e.target.value)}
          fullWidth
          autoFocus
        />
        {errMsg && <Typography style={{ color: "red" }}>{errMsg}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleCloseDialog();
            setNewJobTitle("");
          }}
          color="primary"
          variant="contained"
          sx={btnTextTransformNone}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            if (newJobTitle === "") return;
            if (!(await handleSaveJob(newJobTitle))) {
              setErrMsg("Save new job failed please try  again.");
              return;
            }
            setNewJobTitle("");
          }}
          color="primary"
          variant="contained"
          sx={btnTextTransformNone}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateJobDialog;
