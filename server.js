import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";

import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

import orders from "./routes/orderRoutes.js";

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Cookie parser middleware
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS (Cross-Site Scripting) attacks
/*
  It is a type of web security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other orders.
*/
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Enable CORS (Cross-Origin Resource Sharing)
/*
  CORS is a web security mechanism that allows web applications to access resources hosted on other domains while protecting against unauthorized access and web-based attacks.
*/
let corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions)); //req.connection.remoteAddress

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

// Set security HTTP headers
app.use(helmet());

  
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Shopping List API",
  });
});

app.use("/api/v1/orders", orders);

app.use(errorHandler);

let PORT = 5001;
PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
