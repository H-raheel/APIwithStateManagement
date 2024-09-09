import { PlusIcon, PowerIcon } from "@heroicons/react/16/solid";
import { AppBar, Box, Button, IconButton, Modal, TextField, Toolbar, Typography } from '@mui/material';
import { useFormik } from "formik";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserData';
import { newDoctorSchema } from "../schema";
import { logout } from "../store/reducers/authSlice";
import { addDoctor, nullError } from "../store/reducers/doctorSlice";
function Dashboard() {
 //const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationError,setValidationError]=useState("");
  const [open, setOpen] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const handleOpen = () => {
    
    setOpen(true);}
  const handleClose = () => {
    dispatch(nullError());
    setOpen(false); 
   
   }
  const [refreshData,setRefreshData]=useState(false);
  const error=useSelector((state)=>state.doctor.error);
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
      dc_id: "31",
      email: "",
      name: "",
      contact: "",
    },
    validationSchema: newDoctorSchema,
   
    onSubmit: async (values, helpers) => {
      await dispatch(addDoctor(values));
      
      dispatch(nullError());
      if (!error){
       handleClose();
       alert('doctor added');
      }
      helpers.resetForm();
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
    
    
   
     
    //   
    // }
    setRefreshData((prev)=>!(prev));
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
            
            name="contact"
            label="contact"
            type="number"
            value={values.contact}
            onChange={handleChange}
            fullWidth
            error={touched.contact && errors.contact}
            helperText={touched.contact && errors.contact}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create User
          </Button>
          <Button onClick={handleClose} fullWidth>Cancel</Button>
          <Box mt={2} textAlign="center">
          
            
            {error && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center" 
           mt={2}
        >
          {error}
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
