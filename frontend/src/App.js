import './styles/App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home1";
import Test from "./pages/Test";


import Connect from './pages/Connect';
import Auth from './pages/Auth';
import EditProfile from './pages/EditProfile';
import EditProfileToken from './pages/EditProfileToken';
import VerifyEmail from './pages/VerifyEmail';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';
import ChangePasswordToken from './pages/ChangePasswordToken';
import Robotics from './pages/Robotics';
import IoT from './pages/IoT'; 
import Pcb from './pages/Pcb';
import Register from './pages/Register';
import Search from './pages/Search';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState("none");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(true);
  const [course, setCourse] = useState("none");

  return (
    <BrowserRouter>
    
      <Routes>
      <Route path='/test' element={<Test/>}/>

        <Route path='/' element={<Home user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} checked={checked} setChecked={setChecked}/>}/>
        <Route path='/login' element={<Connect setIsAuthenticated={setIsAuthenticated} STATUS={"login"} MESSAGE={"none"} setUser={setUser} checked={checked} setChecked={setChecked} COURSE={course} setCourse={setCourse}/>}/>
        <Route path='/login/success' element={<Connect setIsAuthenticated={setIsAuthenticated} STATUS={"login"} MESSAGE={"success"} setUser={setUser} checked={checked} setChecked={setChecked} COURSE={course} setCourse={setCourse}/>}/>

        <Route path='/signup' element={<Connect setIsAuthenticated={setIsAuthenticated} STATUS={"signup"} setUser={setUser} checked={checked} setChecked={setChecked} COURSE={course} setCourse={setCourse}/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword user={"none"} checked={checked} setChecked={setChecked}/>}/>

        <Route path='/changePassword/:id/:token' element={<ChangePasswordToken setIsAuthenticated={setIsAuthenticated} user={"none"} setUser={setUser} checked={checked} setChecked={setChecked}/>}/>

        <Route path='/changePassword' element={ isAuthenticated ? <ChangePassword user={user} checked={checked} setChecked={setChecked}/> : <Navigate to={"/"}/>}/>

        <Route path='/home/success' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"success&verify"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
        <Route path='/home/success/subscribe' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"success&verify&subscribe"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
       
        <Route path='/home/oauth/success' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"success"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
        <Route path='/home/oauth/success/subscribe' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"success&subscribe"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>

        <Route path='/home/welcome' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"welcome"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
        <Route path='/home/welcome/verified' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"welcome&verified"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
        <Route path='/home/welcome/subscribe' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"welcome&subscribe"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>
        <Route path='/home' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"none"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>

        <Route path='/logout' element={<Home user={"none"} setUser={setUser} setIsAuthenticated={setIsAuthenticated} MESSAGE={"none"} checked={checked} setChecked={setChecked}/>}/>
      

        <Route path='/home/register/success' element={isAuthenticated ? <Home setUser={setUser} setIsAuthenticated={setIsAuthenticated} user={user} MESSAGE={"register success"} checked={checked} setChecked={setChecked} COURSE={course}/> : <Navigate to={'/'}/>}/>


        <Route path='/auth/google/redirect' element={<Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} setCourse={setCourse}/>}/>
        <Route path='/editProfile' element={isAuthenticated ? <EditProfile user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} checked={checked} setChecked={setChecked} setCourse={setCourse}/> : <Navigate to={'/'}/>}/>

        <Route path='/editProfile/:id/:token' element={<EditProfileToken setIsAuthenticated={setIsAuthenticated} setUser={setUser} checked={checked} setChecked={setChecked}/> }/>

        <Route path='/verifyEmail/:id/:token' element={<VerifyEmail setIsAuthenticated={setIsAuthenticated} setUser={setUser} checked={checked} setChecked={setChecked}/>}/>




        <Route path='/courses/robotics' element={<Robotics user={user} checked={checked} setChecked={setChecked}/>}/>
        <Route path='/courses/IoT' element={<IoT user={user} checked={checked} setChecked={setChecked}/>}/>
        <Route path='/courses/pcb' element={<Pcb user={user} checked={checked} setChecked={setChecked}/>}/>



        <Route path='/register' element={isAuthenticated ? <Register user={user} setCourse={setCourse}/> : <Connect setIsAuthenticated={setIsAuthenticated} STATUS={"login"} MESSAGE={"none"} setUser={setUser} checked={checked} setChecked={setChecked} COURSE={course} setCourse={setCourse}/>}/>

        <Route path='/search' element={isAuthenticated ? <Search user={user} checked={checked} setChecked={setChecked}/> : <Navigate to={"/"}/>}/>

        <Route path='/profile' element={isAuthenticated ? <Profile user={user} checked={checked} setChecked={setChecked}/> : <Navigate to={"/"}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
