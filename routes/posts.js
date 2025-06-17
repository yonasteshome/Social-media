import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import protect from "../middlewares/middleWare.js";
import {
  CreatePost,
  getFeedPosts,
  getUserPosts,
  likePosts,
  addComment,
  countUserPosts
} from "../controllers/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

// 🔸 POST /posts/create - Create new post
router.post("/create", protect, upload.single("picture"), CreatePost);

// 🔸 GET /posts - Get all posts (feed)
router.get("/", protect, getFeedPosts);

// 🔸 GET /posts/:userId/posts - Get posts of a specific user
router.get("/:userId/posts", protect, getUserPosts);

// 🔸 PATCH /posts/:id/like - Like/unlike post
router.patch("/:id/like", protect, likePosts);

// 🔸 POST /posts/:postId/comment - Add comment to post
router.post("/:postId/comment", protect, addComment);

// 🔸 GET /posts/:userId/posts-stats - Get user post stats
router.get("/:userId/posts-stats", protect, countUserPosts);

export default router;
