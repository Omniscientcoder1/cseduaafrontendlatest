import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormModalButton({
  buttonTitle,
  heading,
  open,
  setOpen,
  children,
  className = '',
  maxWidth = 'lg',
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <Button variant="contained" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent className="pb-0">{children}</DialogContent>
      </Dialog>
    </div>
  );
}
