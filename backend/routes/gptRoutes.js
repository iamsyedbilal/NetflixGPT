import express from "express";
import { getMovieRecommendations } from "../controllers/gptController.js";

const router = express.Router();

router.post("/movies", getMovieRecommendations);

export default router;
