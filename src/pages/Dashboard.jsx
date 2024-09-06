import { PlusIcon, PowerIcon } from "@heroicons/react/16/solid";
import { AppBar, Box, Button, IconButton, Modal, TextField, Toolbar, Typography } from '@mui/material';
import { useFormik } from "formik";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserData';
import { RegisterSchema } from "../schema";
import { logout } from "../store/reducers/authSlice";
function Dashboard() {
 //const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationError,setValidationError]=useState("");
  const [open, setOpen] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [refreshData,setRefreshData]=useState(false);
  
  const logoutUser = () => {
   dispatch(logout());
    navigate('/login');
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
   
    onSubmit: async (values, helpers) => {
     
    //   const result = await dispatch(userExists({ email:values.email }));
    //   if(result.payload){
    //     setValidationError('user already exists!')
    //   }
    //   else{
    //   dispatch(
    //     addUser({
    //       name: values.name,
    //       email: values.email,
    //       password: values.password,
    //     })
    //   );
    
    //   helpers.resetForm();
    //   handleClose()
     
    //   setRefreshData((prev)=>!(prev));
    // }
    console.log(values);
    },
  });



  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="lightgray"
    >
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} >
            Dashboard
          </Typography>
          <IconButton 
            variant="contained" 
            size="small"
            onClick={logoutUser}
          >
            <PowerIcon   style={{color:"white", width: "20px", height: "20px" }}/>
          </IconButton>
          <IconButton 
            variant="contained" 
            size="small"
            onClick={handleOpen}
          >
            <PlusIcon   style={{color:"white", width: "20px", height: "20px" }}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={4} gap={4} display="flex" flexDirection="column" >
        
          <Typography variant='h4'>Welcome,
             {/* {user} */}
             </Typography>
         
          
    <UserTable refreshData={refreshData} />
 
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-modal-description"
        sx={{ outline: "none" }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            maxWidth: 500,
            width: { xs: '90%', sm: '80%', md: '60%' },
            p: 4,
          }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5">Add User</Typography>
          
          <form 
          onSubmit={handleSubmit} autoComplete="off">
        
        <Box
          
          display="flex"
          flexDirection="column"
          gap={2}
        >

          <TextField
            name="name"
            label="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            fullWidth
            error={touched.name && errors.name}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
          />
          <TextField
            
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            fullWidth
            error={touched.confirmPassword && errors.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create User
          </Button>
          <Button onClick={handleClose} fullWidth>Cancel</Button>
          <Box mt={2} textAlign="center">
          
            
            {validationError && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center" 
           mt={2}
        >
          {validationError}
        </Typography>)}
          </Box>
          </Box>
      </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default Dashboard;
