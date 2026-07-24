import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cocktailRoutes from "./routes/cocktailRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", cocktailRoutes);

app.get("/", (req, res) => {
  res.send("🍸 ConCOCTail Backend Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});