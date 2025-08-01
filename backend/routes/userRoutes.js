const express = require("express");
const router = express.Router();
const { adminOnly, protect } = require("../middlewares/authmiddleware");
const {
  getUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

//User management routes
router.get("/", protect, adminOnly, getUser); //get all users admin only
router.get("/:id", protect, getUserById); //
router.delete("/:id", protect, adminOnly, deleteUser);
// router.get("/", (req, res) => {
//   res.send("hii gunjan");
// });

module.exports = router;
