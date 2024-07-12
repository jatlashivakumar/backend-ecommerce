import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Define routes after successful connection
    app.use("/book", bookRoute);
    app.use("/user", userRoute);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
