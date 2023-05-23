import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsers,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/", verifyToken, getUsers);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
