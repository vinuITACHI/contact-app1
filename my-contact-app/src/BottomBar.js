// src/BottomBar.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BottomBar = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="body1">
        Powered by v
      </Typography>
    </Box>
  );
};

export default BottomBar;
