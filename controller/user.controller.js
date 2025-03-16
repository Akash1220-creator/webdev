import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
   
  
   console.log("backend controller req body", req.body);
   console.log("backend controller req file", req.file);
   console.log("backend controller req.file uploaded file's public_id and mimetype", req.file.filename, req.file.mimetype);

    const { email, name, password, phone, education, role } = req.body;
    if (!email || !name || !password || !phone || !education || !role || !req.file) {
      return res.status(400).json({ message: "Please fill all required fields" });
    };
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    };
    
     const getfilepath = req?.file ? req?.file?.path : null;
     if (!getfilepath) {
          return res.status(400).json({ error: "No File Selected" });
     };
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo:getfilepath
      
    });
    await newUser.save();
    if (newUser) {
      let token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Singup Done with Details: ",newUser, token);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          education: newUser.education,
          createdOn: newUser.createdOn,
        },
        token: token,
      });
    }
 
} catch (error) {
  console.log('Error ', error);
  console.log("i am from backend",error);
  res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error
  });
};
};


export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};