import express from "express";
import multer from "multer";
import { register, login } from "../controllers/auth.js";

const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";

// Required to resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/assets")); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
