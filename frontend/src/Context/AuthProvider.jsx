import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
                  
          const response = await axios.get("http://localhost:4001/api/blogs/view");
          console.log("from auth provider",response.data);
          setBlogs(response.data);
       } catch (error) {
                console.error("Error fetching blogs:", error.message);
            }
};
fetchBlogs();
  } , [] );
  return (
    <AuthContext.Provider 
    value={{
      blogs
    }}
      >
      {children}
    </AuthContext.Provider>
  );
};
  export const useAuth = () => useContext(AuthContext);