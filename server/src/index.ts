import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/movie-critic";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

// 404 Not Found middleware
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send("404 - Not Found");
});

export default app;
