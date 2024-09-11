import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Box, Button, CircularProgress, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDcIdForUser } from "../helpers/findType";
import { editDoctorSchema } from "../schema";
import { deleteDoctor, editDoctor, nullError, showDoctor, showDoctors } from "../store/reducers/doctorSlice";
export default function UserTable({ refreshData}) {
    const {doctors,loading,error,currentDoctor,editError,types} = useSelector((state) => state.doctor);
    const dispatch=useDispatch()
    console.log(doctors);

 const userData = doctors;
  const [editData, setEditData] = useState({id:"", name: "", email: "" ,contact:"",dc_id:""});
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false); 
 console.log(editError);

  useEffect(() => {
    console.log('Dispatching showDoctors action');
    dispatch(showDoctors()); 
  }, [refreshData,]);
  const handleOpen = () => {setOpen(true); dispatch(nullError());}
    const handleClose = () => {
      setOpen(false);
     }

  const handleDelete = (id) => {
  
    dispatch(deleteDoctor(id));
    
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const handleEditClick = (row) => {
    const dc_id=findDcIdForUser(row,types);
   const data={dc_id,...row}
    setEditData(data);
    console.log(data)
    handleOpen();
  };
  const handleViewClick = (id) => {
    setViewOpen(true); 
    dispatch(showDoctor(id)); 
  }
  const handleViewClose = () => setViewOpen(false);



  const [rows, setRows] = useState(userData);
  useEffect(() => {
    setRows(userData);
  }, [userData]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: editData,
    validationSchema: editDoctorSchema,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
   
      const { id, ...otherData } = values; 
      console.log(values);
  
      const payload = {
        id,
        data: otherData
      };
      try{
      await dispatch(editDoctor(payload)).unwrap();
      
      
       await dispatch(showDoctors());
       handleClose();
       alert('Doctor updated successfully');
      //  setRows((prevRows) =>
      //   prevRows.map((row) => (row.id === values.id ? { ...row, ...values } : row))
      // );
     
          
      }
      catch(error){
        console.error('Failed to update doctor:', error);
      }
   
       
   
    
    console.log(values)
    },
  });
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }




  return (
    <TableContainer component={Paper} elevation={5} borderRadius={5}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "black" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Id</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Name</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Contact</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Email</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Category</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <TableCell>
                <Typography variant="body">{row.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body">{row.contact}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body">{row.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body">{row.doctor_category}</Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  variant="contained"
                  color="error"
                  size="medium"
                  type="button"
                  onClick={() => handleDelete(row.id)}
                >
                  <TrashIcon style={{ width: "20px", height: "20px" }} />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="success"
                  size="medium"
                  onClick={() => handleEditClick(row)}
                >
                  <PencilIcon style={{ width: "20px", height: "20px" }} />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="success"
                  size="medium"
                  onClick={() => handleViewClick(row.id)}
                >
                  <EyeIcon style={{ width: "20px", height: "20px" }} />
                </IconButton>
                
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
         <form 
        onSubmit={handleSubmit} autoComplete="off">
           <Box
          
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5">Edit User Data</Typography>
          <TextField
            name="id"
            type="number"
            disabled
            fullWidth
            label="Id"
            value={values.id}
           
            onChange={handleChange}
            error={touched.id && Boolean(errors.id)}
            helperText={touched.id && errors.id}
          />
          
          <TextField
            name="email"
            type="email"
            
            fullWidth
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
    
            name="name"
            fullWidth
            label="Name"
            value={values.name}
            type="text"
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
           <TextField
    
    name="contact"
    fullWidth
    label="Contact"
    value={values.contact}
    type="text"
    onChange={handleChange}
    error={touched.contact && Boolean(errors.contact)}
    helperText={touched.contact && errors.contact}
  />
     <InputLabel>Doctor Type</InputLabel>
      <Select
        name="dc_id"
        label="Doctor Type"
        value={values.dc_id}
        onChange={handleChange}
      >
        {types.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
        
 
      </Select>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit" >Save</Button>
          </Box>
          </Box>
          </form>
          {editError && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center" 
           mt={2}
        >
          {editError}</Typography>)}
        </Box>
      </Modal>
      <Modal
        open={viewOpen}
        onClose={handleViewClose}
       
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
            mt:7,
          }}
        >
          <Typography variant="h5">Doctor Details</Typography>
          {currentDoctor ? (
            <>

              <Typography variant="body1">Name: {currentDoctor.name}</Typography>
              <Typography variant="body1">Email: {currentDoctor.email}</Typography>
              <Typography variant="body1">Contact: {currentDoctor.contact}</Typography>
              <Typography variant="body1">Category: {currentDoctor.category}</Typography>
              {}
            </>
          ) : (
            <CircularProgress />
          )}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleViewClose} sx={{ mr: 2 }}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
  );

}