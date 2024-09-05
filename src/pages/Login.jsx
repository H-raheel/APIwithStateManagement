import { Box } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';
function LoginPage() {

  
 

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="lightgray"
      p={3}
    >
  
    
      <LoginForm/>
    </Box>
  );
}

export default LoginPage;
