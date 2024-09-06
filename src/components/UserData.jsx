import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Box, Button, CircularProgress, IconButton, Modal, Paper, TextField, Typography } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditSchema } from "../schema";
import { showDoctors } from "../store/reducers/doctorSlice";
const dummyUserData = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Brown", email: "bob.brown@example.com" },
  ];

export default function UserTable({ refreshData}) {
    const {doctors,loading,error} = useSelector((state) => state.doctor);
    const dispatch=useDispatch()
    console.log(doctors);
//   const userData = useSelector((state) => state.user.users);
 const userData = dummyUserData;
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(false);
 

  useEffect(() => {
    console.log('Dispatching showDoctors action');
    dispatch(showDoctors()); // Call the action to fetch doctors
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//   const dispatch = useDispatch();
  const handleDelete = (email) => {
  
  //  dispatch(deleteUser({email}));
    
    setRows((prevRows) => prevRows.filter((row) => row.email !== email));
  };
  const handleEditClick = (row) => {
    setEditData(row);
    handleOpen();
  };



  const [rows, setRows] = useState(userData);
  useEffect(() => {
    setRows(userData);
  }, [refreshData, userData]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: editData,
    validationSchema: EditSchema,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
     
      
    //   dispatch(updateUser({ email: values.email, updatedUser: { ...values } }));
    //   setRows((prevRows) =>
    //     prevRows.map((row) => (row.email === values.email ? { ...row, ...values } : row))
    //   );
    //   handleClose();
    //   setEditData({ name: "", email: "" });
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
              <Typography variant="h5">Email</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Username</Typography>
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              <Typography variant="h5">Actions</Typography>
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <TableCell>
                <Typography variant="body">{row.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  variant="contained"
                  color="error"
                  size="medium"
                  type="button"
                  onClick={() => handleDelete(row.email)}
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
            p: 4,
          }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="h5">Edit User Data</Typography>
          <TextField
            name="email"
            type="email"
            disabled
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
            label="Username"
            value={values.name}
            type="text"
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
  );

}