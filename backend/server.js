import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import gptRoutes from "./routes/gptRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/gpt", gptRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
