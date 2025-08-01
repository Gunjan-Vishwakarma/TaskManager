require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const { METHODS } = require("http");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");
const connectDB = require("./config/db");

const app = express();

//Middleware to handle CORS

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Connect databse
connectDB();

//middleware
app.use(express.json());

//routes
// routes
// app.use("/auth", authRoute);
// app.use("/api", userRoute);

app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);

//server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Start Server

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
