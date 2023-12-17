import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

const MyDialog = ({ dialogText: { dialogContent, dialogBtn1Text, dialogBtn2Text }, open, handleAgree, handleCloseDialog }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    handleCloseDialog();
  };
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip title="send" placement='top' arrow>
            <Button autoFocus onClick={handleAgree} >
              {dialogBtn1Text}
            </Button>
          </Tooltip>
          <Button onClick={handleClose} autoFocus>
            {dialogBtn2Text}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyDialog;
