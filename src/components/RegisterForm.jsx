import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../schema";
import { createUser,setError } from "../store/reducers/authSlice";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.auth);
  console.log(loading)
  console.log(error)
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
      password_confirmation: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, helpers) => {
      const result =  dispatch(createUser( values ));
     if(error!=null){
      helpers.resetForm();
      
        dispatch(setError());
        navigate("/login");
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
            Create Account
          </Typography>

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
            name="password_confirmation"
            label="confirmPassword"
            type="password"
            value={values.password_confirmation}
            onChange={handleChange}
            fullWidth
            error={touched.password_confirmation && errors.password_confirmation}
            helperText={touched.password_confirmation && errors.password_confirmation}
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
              Register
            </Button>
          )}
        </Box>
          <Box mt={2} textAlign="center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Login
            </Link>
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
    </>
  );
}

export default RegisterForm;
