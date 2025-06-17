import express from "express";
import { getUser, getUserFriends, addRemoveFriends, getNotFriends} from "../controllers/users.js";
import protect from "../middlewares/middleWare.js";

const router = express.Router(); // Initialize new router instance

// Define routes
router.get("/:id", protect, getUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:id/:friendId", protect, addRemoveFriends);
router.get("/:id/notfriends", protect, getNotFriends); // 🆕 Get users who are not your friends yet

export default router;
