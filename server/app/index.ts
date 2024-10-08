import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";

import auth from "./routes/auth";
import tasks from "./routes/tasks";
import cookieParser from "cookie-parser";
import { getEnv } from "./utils";

// config dotenv
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || 8082;

// cors
app.use(
  cors({
    origin: getEnv('CLIENT_URL'),
    credentials: true,
  })
);

// body-parser
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

// init morgan logger
app.use(morgan(":method :url :status - :response-time ms"));

// Routes
app.use("/auth", auth);
app.use("/task", tasks);

server.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  process.exit();
});

process.on("SIGTERM", async () => {
  console.log("Gracefully shutting down...");
  process.exit();
});
