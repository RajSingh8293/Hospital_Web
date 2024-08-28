import express, { Router } from "express";
import {
  allUsers,
  changeCurrentPassword,
  deleteProfile,
  deleteUserAccount,
  getProfile,
  getUserAccountById,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  updateProfileImage,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";

const router = Router();

// user
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);

// user
router.get("/user/me", isAuthenticated, getProfile);
router.put("/user/update/me", isAuthenticated, updateProfile);
router.post("/user/change-paasword", isAuthenticated, changeCurrentPassword);
router.put(
  "/user/update/profile-image",
  upload.single("profileImage"),
  isAuthenticated,
  updateProfileImage
);
router.delete("/user/delete/me", isAuthenticated, deleteProfile);

// admin
router.get("/user/all", allUsers);
router.delete("/user/admin/delete/:id", isAuthenticated, deleteUserAccount);
router.get("/user/admin/get/:id", isAuthenticated, getUserAccountById);

export default router;
