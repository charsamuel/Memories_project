import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Updated field name
  image: { type: String, required: true }, // Storing the Base64 string
  

  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
