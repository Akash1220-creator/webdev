import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    //required: true,
  },

  blogImage:{
    type: String
  },

  category: {
    type: String,
    //required: true,
  },
  about: {
    type: String,
    //required: true,
    minlength: [ 5, "Should caontain atleast 200 characters!"],
  },
  
  adminName: {
    type: String,
  },
  adminPhoto: {
    type: String,
  },  

 createdBy: {
    type: mongoose.Schema.ObjectId, //mongo db id 
    ref: "User", //for Storing reference to the user
  },
});
export const Blog = mongoose.model("Blog", blogSchema);