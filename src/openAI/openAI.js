export async function fetchGPTMovies(query, language) {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const prompt = `
You are a multilingual movie recommendation system.
User searched: "${query}"
Language: ${language}
Return ONLY a JSON array of 05–10 movie names.
`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });

    const data = await res.json();
    const rawText = data.choices[0].message.content.trim();

    let movies = [];
    try {
      movies = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\[[\s\S]*\]/);
      if (match) movies = JSON.parse(match[0]);
    }

    return movies;
  } catch (err) {
    console.error("Groq Frontend Error:", err);
    return [];
  }
}
