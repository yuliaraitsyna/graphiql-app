import {Alert, Box, Snackbar, SnackbarCloseReason} from '@mui/material';

type Props = {
  message: string;
  isOpen: boolean;
  onChange: (v: boolean) => void;
};

export default function ErrorSnackbar({onChange, message = '', isOpen = false}: Partial<Props>) {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onChange) onChange(false);
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        style={{marginTop: '8rem'}}>
        <Box sx={{maxWidth: '512px'}}>
          <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
            {message}
          </Alert>
        </Box>
      </Snackbar>
    </>
  );
}
