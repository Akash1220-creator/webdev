import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "../backend/route/user.route.js";
import { v2 as cloudinary } from 'cloudinary';
import blogRoute from "./route/blog.route.js";
//following imports for authentication
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const port = process.env.PORT;
const MONGO_URL=process.env.MONGO_URI;



//middleware express instantiated
const app = express();
//set Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*add multer middleware configuration
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {
  fileSize: 5 * 1024 * 1024, // 5 MB file size limit
}, });*/

//connection with frontend
app.use( cors({ origin:process.env.FRONTEND_URL,  methods:["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],credentials:true }) );

// Test Route
app.get("/", (req, res) => {
  res.send("CORS is working fine!");
});

//app.use(fileUpload({useTempFiles:true, tempFileDir:"/tmp",}));
app.use(cookieParser()); //extract token cereated in cookies while creaating a blog by Blog.create(blogData) 

/*app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);*/
//Mongo DB Connection
try{
  mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}catch (error){
  console.log(error);
}

//defining route
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

  /*Cloudinary connection
  cloudinary.config({ 
    cloud_name: 'process.env.CLOUD_NAME', 
    api_key: 'process.env.CLOUD_API_KEY', 
    api_secret: 'process.env.CLOUD_SECRET_KEY' 
});*/

app.get('/api/blogs/viewAllBlogs', (req, res) => {
  res.json({ message: "List of blogs" });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack trace
  res.status(500).json({ message: err.message });
});

/*
test data
"message": "User registered successfully",
.{
    "email" : "yxz@gmail.com",
    "password" : "xyzxyz",
    "role" : "admin"
    
}

{
    "message": "Blog created successfully",
    "blog": {
        "title": "Rythm",
        "blogImage": "https://res.cloudinary.com/dzscnpm7l/image/upload/v1741111917/uploads/Blog-1741111906700.png",
        "category": "tech",
        "about": "eyJhbGciOiJIU
        "createdBy": "67c716b7719eb4de9c5499c5",
        "_id": "67c74269d5a9a30202477be1",
        "__v": 0
    }
}
http://localhost:4001/api/blogs/create
{
    "title" : "8th Blog",
    "category" : "Tecnological",
    "about":"startTechnology  interaction Social media platforms have further revolutionized communication enabling people to share thoughts and experiences effortlessly Meanwhile advancements in artificial intelligence and automation continue to enhance efficiency in various industries "
}
*/
