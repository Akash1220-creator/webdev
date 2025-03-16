import  { useState } from "react";
import React from "react";
import { useAuth } from "../Context/AuthProvider.jsx";
import { Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const { user, blogs } = useAuth();
  console.log(blogs);
  const [show, setshow]=useState(false);

  return (
    <>
      {/*desktop navbar*/}
      <nav className="bg-white shadow-xl px-4 py-3">
        <div className="flex justify-between items-center container mx-auto">
          <div className="font-semibold text-xl"><span className="text-black">Mentor</span><span className="text-blue-500">Geeks</span></div>
          <div >
               <ul className="hidden md:flex space-x-6">
                  <Link to="/" className="hover:text-blue-500">HOME</Link>
                  <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
                  <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
                  <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
                  <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
               </ul>
            <div className="md:hidden" onClick={() => setshow(!show)}>{show ? <IoCloseCircle size={24} /> : <AiOutlineMenu size={24} />}</div>
          </div>

          <div className="hidden md:flex">
            <Link to="/dashboard" className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-100 px-4 py-2 rounded-md">DASHBOARD</Link>
            <Link to="/login" className="bg-red-700 text-white font-semibold hover:bg-red-800 duration-100 px-4 py-2 rounded-md">LOGIN</Link>
          </div>
        
          </div>
        {/*mobile navbar*/}
        {show && (
        <div className="bg-white">
        <ul className="flex md:hidden flex-col h-screen items-center justify-center space-y-3 text-xl">
                  <Link to="/" className="hover:text-blue-500">HOME</Link>
                  <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
                  <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
                  <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
                  <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
               </ul>
        </div>)}
      </nav>
    </>
  );
}

export default Navbar;
