export async function fetchGPTMovies(query, language) {
  try {
    const res = await fetch("http://localhost:5000/api/gpt/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, language }),
    });

    const data = await res.json();
    return data.movies || [];
  } catch (error) {
    console.error("GPT Movie Error:", error);
    return [];
  }
}
