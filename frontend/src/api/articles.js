const API_URL = "http://localhost:5000";

export async function fetchArticles() {
  const res = await fetch(`${API_URL}/articles`);
  return res.json();
}
