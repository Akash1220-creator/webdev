import React,{ useState } from "react"; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
function Register() {
const navigateTo = useNavigate();
const [name, setName] = useState("");
const [role, setRole] = useState(""); 
const [email, setEmail] = useState(""); 
const [phone, setPhone] = useState("");
const [education, setEducation] = useState("");
const [password, setPassword] = useState("");
const [photo, setPhoto] = useState("[]");
const [photoPreview, setPhotoPreview] = useState("");
  
  const changePhotoHandler = (e) => {
    console.log("change handler",e);
    if (!e.target.files || e.target.files.length === 0) {
      console.warn("No file selected");
      return;
    };
    const file = e.target.files[0];
    console.log("Selected File:", file); // Log file info
    /* Allow only PNG files
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
      alert("Only PNG, JPG, and JPEG files are allowed!");
      return;
    }*/
  const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };

    };

    const handleRegister = async (e) => {
     e.preventDefault();
     // Check if any field is empty

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
   formData.append("education", education);
   formData.append("photo", photo); //"photo"  is key photo is field's "name" property
   console.log("hi register.js photo", formData)
 //  Debugging: Log FormData before sending
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
  console.log("rjsPhoto Name:", photo.name);
  console.log("rjsPhoto Type:", photo.type);
  console.log("rjsPhoto Size:", photo.size);

    
      //connecting to backend api
      // Don't set `Content-Type` manually! The browser handles it
      try {const response =await axios.post("http://localhost:4001/api/users/register", formData, {
        headers: {
          "Accept": "application/json", // Optional
        },
      });

      console.log("Response from Backend:", response.data); //Log response
    alter(response.data.message || "User Registered Successfully");
      setName("");  
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");

    }  catch (error) {
     // Server responded with error
     alert("Check if all fields are filled");
    }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <form onSubmit={handleRegister} encType="multipart/form-data">
      <div className="font-semibold text-xl item-centre text-center">
               <span className="text-black">Mentor</span><span className="text-blue-500">
                  Geeks
                </span>
            </div>
            <h1 className=" font-semibold text-center mb-6"> Register</h1>
            
            <input type="email" placeholder="your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded-sm"/>         
            <input type="text" placeholder="your name"  onChange={(e) => setName(e.target.value)} value={name} className="w-full p-2 mb-4 border rounded-sm"/>
            <input type="password" placeholder="your password"  onChange={(e) => setPassword(e.target.value)} value={password} className="w-full p-2 mb-4 border rounded-sm"/>         
            <input type="number" placeholder="your phone" value={phone}   onChange={(e) => setPhone(e.target.value)} className="w-full p-2 mb-4 border rounded-sm"/>         
            <select value={education} onChange={(e)=>setEducation(e.target.value)}  className="w-full p-2 mb-4 border rounded-sm">
                 <option>Select Education</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
            </select>  
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-sm">
                 <option>Select Role</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>   
           <div className="item-center flex mb-4"></div>
            <div className="photo w-20 h-20 mr-4">
              <img  src={photoPreview ? `${photoPreview}` : "photo"} alt="photo"></img>
              <input type="file" onChange={changePhotoHandler}  className="w-58 p-2 border rounded-sm"/>
            </div>
            <Toaster />

            <p>
              Already Registered?{" "}
              <Link to={"/login"} className="text-blue-600">Login Now</Link>
            </p>
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300">
              Register
            </button>
            <toaster/>
            </form>
      </div>
    </div>
   
  );
  
};

export default Register;
