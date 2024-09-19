declare var require: any;
const dotenv = require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173/", // Replace with your actual frontend URL
//     credentials: true,
//   })
// );
app.use(fileUpload());

const authRoutes = require("./auth/routes");
const userRoutes = require("./users/routes");
const postRoutes = require("./posts/routes");
const mediaRoutes = require("./media/routes");

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err: any) => console.log(err));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/media", mediaRoutes);

app.listen(port, () => {
  console.log(`API listening on port ${port}! Go to http://localhost:${port}/`);
});
