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
        <DialogContent sx={{minWidth: '300px'}}>
          <DialogContentText sx={{textTransform: 'none'}}>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', alignContent:'center', justifyContent:'space-between'}}>
          <Button onClick={handleClose} variant='outlined' sx={{textTransform: 'none'}} autoFocus>
            {dialogBtn2Text}
          </Button>
          <Tooltip title="send" placement='top' arrow>
            <Button autoFocus variant='contained' sx={{textTransform: 'none'}} onClick={handleAgree} >
              {dialogBtn1Text}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyDialog;
