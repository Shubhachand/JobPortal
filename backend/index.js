import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";
import jobRoute from "./routes/job.route.js";
// environment variable loaded
dotenv.config();
const app = express();

//middleware
app.use(express.json()); // to get in json format
app.use(express.urlencoded({ extended: true })); // to get in urlencoded format
app.use(cookieParser()); // to get the cookie from the browser so that we can authenticate the user
// app.use(cors());  // to connect the frontend and backend
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoute);
//job route
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
