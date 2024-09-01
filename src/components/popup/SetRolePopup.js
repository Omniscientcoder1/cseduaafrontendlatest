import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
  } from '@mui/material';
  import { useState } from 'react';
  
  import { roles } from 'src/constants/options';
  
  function SetRolePopup({ children, onConfirm, style, role, username }) {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(role);

  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleConfirm = () => {
      onConfirm(username, selectedRole);
      handleClose();
    };
  
    const handleChange = (event) => {
      setSelectedRole(event.target.value);
    };
  
    return (
      <>
        <span style={style} onClick={handleOpen}>
          {children}
        </span>
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle>Set Role</DialogTitle>
          <DialogContent>
            <Select value={selectedRole} onChange={handleChange} fullWidth>
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  export default SetRolePopup;
  