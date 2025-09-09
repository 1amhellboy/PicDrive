import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login'; 
import Signup from './pages/Signup';
import PicDrivePage from './pages/PicDrivePage';
import Component from "./pages/hero";
import Auth from './pages/auth';


// import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/login" element={<Auth />} />
        <Route path='/signup' element={<Auth/>}></Route>
        <Route path='/dashboard' element={<PicDrivePage/>}></Route>
        <Route path='/' element={<Component/>}></Route>
        {/* Later add dashboard route etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
