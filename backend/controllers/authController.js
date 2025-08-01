const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Image upload code

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Export as middleware
const uploadMiddleware = upload.single("image");

// Then use this in the route handler
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.status(200).json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
    path: req.file.path.replace(/\\/g, "/"),
  });
};

//image upload code ends here

//Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email is invalid" });
    }
    //compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password does not match" });
    }
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed!", err: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    //object destructuring
    const { name, email, password, profileImageUrl } = req.body;
    const userExists = await User.findOne({ email });
    //check if user exists
    if (userExists) {
      return res.status(400).json({ message: "user already exists!" });
    }
    //user create
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("hashed password : ", hashedPassword);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl,
    });
    return res.status(200).json({ msg: "User Created Successfully !" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot Register", err: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.json(user);
  } catch (err) {
    console.log("error while getting profile");
    res.status(401).json({ message: "Server Error", err: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
      token: generateToken(updateUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  generateToken,
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  uploadMiddleware,
  uploadImage,
};
