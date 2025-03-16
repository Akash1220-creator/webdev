import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
    const { blogs } = useAuth();
    console.log(blogs); // Debugging

    return (
        <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {blogs && blogs.length > 0 ? (
                blogs.slice(25, 29).map((element) => {
                    console.log(element);
                    return (
                        <Link
                            to="/"
                            key={element._id || Math.random()} // Fallback key
                            className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 duration-100"
                        >
                            {/* Blog Image with gradient Overlay & Title */}
                            <div className="group relative">
                                <img
                                    src={element.blogImage || "https://via.placeholder.com/300"} // Dummy image if missing
                                    alt="Blog"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>
                                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                                    {element.title || "Untitled Blog"} {/* Fallback title */}
                                </h1>
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
                                        New 
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div className="text-center text-gray-500">No blogs available</div> // Message when no blogs
            )}
        </div>
    );
}

export default Hero;
