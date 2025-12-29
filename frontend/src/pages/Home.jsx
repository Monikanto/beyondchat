import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleList from "../components/ArticleList";

export default function Home() {
  const [articles, setArticles] = useState([]);

 useEffect(() => {
  fetchArticles().then(data => {
    console.log("Fetched articles:", data);
    setArticles(data);
  });
}, []);


  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>BeyondChats Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
