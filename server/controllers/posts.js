// // controllers/posts.js
// import PostMessage from "../models/postMessage.js";

// export const getPosts = async (req, res) => {
//   try {
//     const postMessages = await PostMessage.find();
//     res.status(200).json(postMessages);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const createPost = async (req, res) => {
//   const { title, message } = req.body;
//   const image = req.file ? req.file.path.replace(/\\/g, "/") : null; // Handle the file path for different OS

//   const newPost = new PostMessage({ title, message, image });
//   try {
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// export const editPost = async (req, res) => {
//   const { id } = req.params;
//   const { title, message } = req.body;

//   try {
//     const updatedPost = await PostMessage.findByIdAndUpdate(
//       id,
//       { title, message },
//       { new: true }
//     );
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const deletePost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await PostMessage.findByIdAndDelete(id);
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getPostByTitle = async (req, res) => {
//   const { title } = req.query;

//   try {
//     const post = await PostMessage.findOne({ title });
//     if (!post) return res.status(404).json({ message: "Post not found" });
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
