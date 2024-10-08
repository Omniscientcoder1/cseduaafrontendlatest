// import React from 'react';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = ({ authenticated = true }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Link to={authenticated ? '/' : '/home'}>
        <img
          src="/Final AA PNG.png"
          alt="CSEDU Alumni Association Logo"
          style={{ width: 170, margin: '10px 10px 10px 0px' }}
        />
      </Link>
    </div>
  );
};

export default Logo;
