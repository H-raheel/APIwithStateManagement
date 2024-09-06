import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../schema";
import { loginUser, setError } from "../store/reducers/authSlice";


function LoginForm() {
   const navigate=useNavigate();
    const dispatch=useDispatch()
    const {loading,error}=useSelector((state)=>state.auth);
   
    const {
        values,
        errors,
        touched,
      
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
         
          email: "",
         password: "",
        
        },
        validationSchema: LoginSchema,
        onSubmit :
        (values, helpers) => {
       dispatch(loginUser( values ));
         if(error!=null){
          helpers.resetForm();
           dispatch(setError());
            navigate("/dashboard");
         }
         
        
      
       
        },
      });
    
     
  return (
    <>
<form onSubmit={handleSubmit} autoComplete="off">
      <Box
      
       
        p={4}
        borderRadius={2}
        boxShadow={3}
        bgcolor="white"
        width={400}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h5" textAlign="center">
      Login
        </Typography>

      
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
        
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
             Login
            </Button>
          )}
        </Box>
        <Box mt={2}
        textAlign='center'>
       Dont have an account?{" "}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Register
        </Link>
        {error && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center" 
        mt={2}
        >
          {error}
        </Typography>
      )}
      </Box>
      </Box>
      </form>
     
      
    </>
  );
}

export default LoginForm;
