import { Box } from '@mui/material';

import React from 'react';
import RegisterForm from '../components/RegisterForm';


function RegisterPage() {
  
     
  



  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="gray"
      justifyContent="center"
      alignItems="center"
    >
        <RegisterForm/>
     
    </Box>
  );
}

export default RegisterPage;
