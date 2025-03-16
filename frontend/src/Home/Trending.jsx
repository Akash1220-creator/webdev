import React from 'react';
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Trending() {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const { blogs } = useAuth();
    console.log(blogs); // Debugging

    return (
        <div className="container mx-auto my-10 p-6">
            <h1 className='text-2xl font-semibold mb-4'>Trending</h1>

            {blogs && blogs.length > 0 ? (
                <Carousel
                    responsive={responsive}
                    containerClass="w-full p-0 m-0"
                    itemClass="p-2"
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}>
                    {blogs.slice(25, 29).map((element) => {
                        console.log(element);
                        return (
                            <Link
                                to="/"
                                key={element._id || Math.random()} // Fallback key
                                className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 duration-100"
                            >
                                {/* Blog Image with gradient Overlay & Title */}
                                <div className="group relative" >
                                    <img
                                        src={element.blogImage || "https://via.placeholder.com/300"} // Dummy image if missing
                                        alt="Blog"
                                        className="w-full h-56 object-cover rounded border-2 border-gray-300 p-2"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                                        {element.title || "Untitled Blog"} {/* Fallback title */}
                                    </h1>
                                </div>
                                <div className="absolute top-5 left-5 bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded-2xl">
                                  {element?.category || "Uncategorized"}
                                </div>
                                {/* Admin Photo & Name in a Single Row */}
                                <div className="p-6 flex items-center space-x-4">
                                    {/* Admin Photo */}
                                    <img
                                        src={element.adminPhoto}
                                        alt="img"
                                        className="w-12 h-12 rounded-full border-2 border-yellow-400"
                                    />
                                    {/* Admin Name */}
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {element.adminName || "Admin Unknown"} {/* Fallback name */}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            New Blogs appear here
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </Carousel>
            ) : (
                <div className="text-center text-gray-500">No blogs available</div> // Message when no blogs
            )}
        </div>
    );
}
