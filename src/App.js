
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {


  return (

    <Routes>
    
     <Route path="/login" element={ <LoginPage />} />
      <Route path="/"  element={<Navigate to="/login" />} />
      <Route path="/register" element={ <RegisterPage />} />)
     

    
         <Route element={<Dashboard/>} path="/dashboard" />
        
    

   
    </Routes>
  );
}
 
export default App;
