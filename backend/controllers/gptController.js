import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getMovieRecommendations(req, res) {
  try {
    const { query, language } = req.body;

    if (!query) return res.status(400).json({ error: "Query is required" });

    const prompt = `
You are a multilingual movie recommendation system.
User searched: "${query}"
Language: ${language}

Return ONLY a JSON array containing 10–15 movie names.
Example Response: ["Movie 1", "Movie 2", ...]
No explanation text. Only the JSON array.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const rawText = completion.choices[0].message.content.trim();

    let movieList = [];

    try {
      movieList = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\[[\s\S]*\]/);
      if (match) movieList = JSON.parse(match[0]);
    }

    return res.json({ movies: movieList });
  } catch (error) {
    console.error("Groq Backend Error:", error);
    return res.status(500).json({ error: "Server error: Groq failed" });
  }
}
