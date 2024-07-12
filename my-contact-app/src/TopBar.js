import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from './avatar.png'; // Adjust the path as necessary
import logo from './abn-logo.jpeg'; // Adjust the path as necessary

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#1976d2' }} // Use your custom color here
    >
      <Toolbar>
        <img
          src={logo}
          alt="Logo"
          style={{ marginRight: '16px', height: '40px' }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Contact-app
        </Typography>
        <Avatar
          alt="User Avatar"
          src={avatar}
          onClick={handleClick}
          sx={{ cursor: 'pointer' }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
