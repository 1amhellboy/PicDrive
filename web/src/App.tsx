import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login'; 
// import Signup from './pages/Signup';
import PicDrivePage from './pages/PicDrivePage';
import Component from "./pages/hero";
import Auth from './pages/auth';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import  ResetPassword  from './pages/resetPassword';


// import Dashboard from './pages/Dashboard';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/login" element={<Auth />} />
        <Route path='/signup' element={<Auth/>}></Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <PicDrivePage/>
          </PrivateRoute>
          }></Route>
        <Route path='/' element={<Component/>}></Route>
        {/* Later add dashboard route etc. */}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
