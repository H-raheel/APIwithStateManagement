import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

export const axiosInstance = axios.create({
  baseURL: 'https://healthcare.mehboob.co/api/',
});


function App() {
  const token = localStorage.getItem("token"); 

  
  const isAuthenticated =  token;

  return (

    <Routes>
      //authenticated
      console.log(isAuthenticated)
    {  !isAuthenticated &&
     ( <>
     <Route path="/login" element={ <LoginPage />} />
      <Route path="/*" element={ <LoginPage />} />
      <Route path="/register" element={ <RegisterPage />} />)
      </>)
      }
//protected
      <Route element={<ProtectedRoute/>}>
         <Route element={<Dashboard/>} path="/dashboard" />
         <Route element={<Navigate to="/dashboard" />} path="/login"/>
         <Route element={<Navigate to="/dashboard" />} path="/register"/>
      </Route>

   
    </Routes>
  );
}
 
export default App;
