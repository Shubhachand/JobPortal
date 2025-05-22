import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

// Import custom modules
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();


// Middleware


// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies from the request headers
app.use(cookieParser());

// Configure CORS for frontend-backend communication
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// Routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.use(express.static(path.join(_dirname, 'frontend', 'dist')));

app.get('*', (_, res) => {
  res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));
});

// Server + DB Connection
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  
});
