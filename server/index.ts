require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./auth/routes");
const userRoutes = require("./users/routes");
const postRoutes = require("./posts/routes");

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

app.listen(port, () => {
  console.log(`API listening on port ${port}! Go to http://localhost:${port}/`);
});
