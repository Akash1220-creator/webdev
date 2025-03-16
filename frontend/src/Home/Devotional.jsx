import React from 'react';
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

export default function Devotional() {
    const { blogs } = useAuth();
    console.log(blogs); // Debugging
    const devotionalBlogs=blogs?.filter((blog)=>blog.category==="Devotional");

    return (
    <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">Devotional</h1>
        <p className='text-center mb-8'> i am very devotional   </p>
    <div className='grid grids-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4' >
      { devotionalBlogs && devotionalBlogs.length > 0 ? (
        devotionalBlogs.map((blog, index)=>(
            <Link 
            to={`/blog/${blog.id}`}
            key={index}
            className="rlative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
                <img
                src={blog?.blogImage}
                alt="no image"
                className="w-full h-48 object-cover"
                />
            <div className="absolute insert-0 bg-black opacity-30"></div>
            <div className='absolute bottom-4 left-4 text-white'>
                <h2 className='text-lg font-semibold'>{blog.title}</h2>
                <p className='text-sm'>{blog?.category}</p>
            </div>
            </Link>
        ))
      ):(
      <div></div>
      )}
    </div>
    </div>
  );
};
