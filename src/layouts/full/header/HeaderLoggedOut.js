// import React from 'react';
// import { Box, AppBar, Toolbar, styled, Stack, Button } from '@mui/material';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Logo from '../shared/logo/Logo';

// // components
// import { IconBellRinging, IconMenu } from '@tabler/icons';

// const HeaderLoggedOut = (props) => {
//   // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
//   // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

//   const AppBarStyled = styled(AppBar)(({ theme }) => ({
//     boxShadow: 'none',
//     background: theme.palette.primary.main, // Updated color
//     justifyContent: 'center',
//     backdropFilter: 'blur(4px)',
//     [theme.breakpoints.up('lg')]: {
//       minHeight: '70px',
//     },
//   }));
//   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
//     width: '100%',
//     color: theme.palette.text.primary, // Updated text color
//   }));

//   const ButtonStyled = styled(Button)(({ theme }) => ({
//     color: theme.palette.text.primary, // Updated button text color
//   }));

//   return (
//     <AppBarStyled position="sticky" color="default">
//       <ToolbarStyled>
//         {/* <IconButton
//           color="inherit"
//           aria-label="menu"
//           onClick={props.toggleMobileSidebar}
//           sx={{
//             display: {
//               lg: 'none',
//               xs: 'inline',
//             },
//           }}
//         >
//           <IconMenu width="20" height="20" />
//         </IconButton> */}
//         <Logo />
//         {/* <IconButton
//           size="large"
//           aria-label="show 11 new notifications"
//           color="inherit"
//           aria-controls="msgs-menu"
//           aria-haspopup="true"
//           sx={{
//             ...(typeof anchorEl2 === 'object' && {
//               color: 'primary.main',
//             }),
//           }}
//         >
//           <Badge variant="dot" color="primary">
//             <IconBellRinging size="21" stroke="1.5" />
//           </Badge>
//         </IconButton> */}
//         <Box flexGrow={1} />
//         <Stack spacing={2} direction="row" alignItems="center">
//           {/* <ButtonStyled component={Link} to="/about">
//             About
//           </ButtonStyled>
//           <ButtonStyled component={Link} to="/contact">
//             Contact Us
//           </ButtonStyled> */}
//           <ButtonStyled onClick={handleRegisterModalOpen}>
//             Log In
//           </ButtonStyled>
//           <ButtonStyled component={Link} to="/auth/register">
//             Register
//           </ButtonStyled>
//         </Stack>
//       </ToolbarStyled>
//     </AppBarStyled>
//   );
// };

// HeaderLoggedOut.propTypes = {
//   sx: PropTypes.object,
// };

// export default HeaderLoggedOut;
import {
  AppBar,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/logo/Logo';

const HeaderLoggedOut = (props) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Handlers for opening and closing the modal
  const handleRegisterModalOpen = () => setShowRegisterModal(true);
  const handleRegisterModalClose = () => setShowRegisterModal(false);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.primary.main,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.primary,
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    borderRadius: '50px',
    padding: '8px 20px',
    textTransform: 'none',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#FFD700', // Yellow hover effect
    },
  }));

  return (
    <>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          <Logo />
          <Box flexGrow={1} />
          <Stack spacing={2} direction="row" alignItems="center">
            <ButtonStyled onClick={() => navigate('/auth/login')}>Log In</ButtonStyled>
            <ButtonStyled onClick={handleRegisterModalOpen}>Register</ButtonStyled>
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>

      {/* Register Modal */}
      <Modal open={showRegisterModal} onClose={handleRegisterModalClose}>
        <Box
          sx={{
            padding: '20px',
            maxWidth: '500px',
            margin: 'auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            outline: 'none',
            mt: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Join the CSEDU Alumni Association
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <Typography variant="body1" gutterBottom>
            Thank you for your interest in joining the Dhaka University CSE Alumni Association.
            Becoming a member allows you to reconnect, stay updated, and contribute to our
            community.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>How to Register:</strong> You can apply for membership by following the steps in
            the guide below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleRegisterModalClose();
              navigate('/auth/register');
            }}
            fullWidth
            sx={{ mt: 2 }}
          >
            Proceed to Register
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="/registration-guide.pdf" // Path to the PDF in the public folder
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice
            fullWidth
            sx={{ mt: 2 }}
          >
            View Registration Guide (PDF)
          </Button>
        </Box>
      </Modal>
    </>
  );
};

HeaderLoggedOut.propTypes = {
  sx: PropTypes.object,
};

export default HeaderLoggedOut;
