import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // make sure the path is correct
import Signup from './pages/Signup';
import PicDrivePage from './pages/PicDrivePage';
// import Component from "./pages/hero";


// import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<PicDrivePage/>}></Route>
        {/* <Route path='/' element={<Component/>}></Route> */}
        {/* Later add dashboard route etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
