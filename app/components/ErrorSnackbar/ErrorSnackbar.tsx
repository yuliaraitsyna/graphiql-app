import {Alert, Box, IconButton, Snackbar, SnackbarCloseReason} from '@mui/material';
import {CloseIcon} from '../Icons';

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

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Box sx={{maxWidth: '512px'}}>
          <Alert severity="error" style={{paddingRight: '48px'}}>
            {message}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              style={{position: 'absolute', top: '4px', right: '4px'}}>
              <CloseIcon />
            </IconButton>
          </Alert>
        </Box>
      </Snackbar>
    </>
  );
}
