const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authmiddleware");

// Use multer middleware before the controller function
router.post(
  "/upload-image",
  authController.uploadMiddleware,
  authController.uploadImage
);
//Auth Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", protect, authController.getUserProfile);
router.put("/update", protect, authController.updateUserProfile);
// router.post("/upload-image", authController.uploadImage);

module.exports = router;
