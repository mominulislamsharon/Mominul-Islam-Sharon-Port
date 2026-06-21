import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import app from "./app";
import config from "./config";

const PORT = config.PORT;

async function main() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("🐘 Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

main();
