import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../schema";

function RegisterForm() {
  const navigate = useNavigate();
 
  const [validationError, setValidationError] = useState("");
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
    onSubmit: (values, helpers) => {
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
    //   alert("user signed up successfully");
    //   navigate("/login");
    // }
    console.log(values);
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
            Register
          </Button>
          <Box mt={2} textAlign="center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Login
            </Link>
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
    </>
  );
}

export default RegisterForm;
