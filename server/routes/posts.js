// // routes/posts.js
// import express from 'express';
// import { getPosts, createPost, editPost, deletePost, getPostByTitle } from '../controllers/posts.js';
// import multer from 'multer';

// const router = express.Router();

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.get('/', getPosts);
// router.post('/', upload.single('image'), createPost); // Handle file uploads
// router.put('/:id', editPost);
// router.delete('/:id', deletePost);
// router.get('/search', getPostByTitle);

// export default router;


