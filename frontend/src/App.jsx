import React from "react";
import '../src/App.css'; //to apply css
import Navbar from "../src/Components/Navbar";
import Home from "../src/Components/Home";
import Footer from  "../src/Components/Footer";
import About from "../src/pages/About";
import Contacts from "../src/pages/Contacts";
import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import Blogs from "../src/pages/Blogs";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useAuth} from "../src/Context/AuthProvider.jsx";
import {Toaster} from "react-hot-toast"; // Importing toast notification library

function App() {
  
  
  const location= useLocation();
  const hideNavbarFooter = ["/dashboard","/dashboard/", "/login","/login/", "/logout","/logout/", "/register/", "/register "].includes(location.pathname);
// or use regular expression const hideNavbarFooter = /^\/(dashboard|login|logout|register)\b/.test(location.pathname);

  const {blogs}=useAuth();
  console.log(blogs);
  return (
   
      <div>
         {!hideNavbarFooter && <Navbar/>}
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        <Toaster/>  {/* Enables toast notifications globally */}
        {!hideNavbarFooter && <Footer/> }
        
      </div>        
  );
}
export default App
