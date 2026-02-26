import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { router } from "./router";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    const server = http.createServer((req, res) => {
      router(req, res);
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();