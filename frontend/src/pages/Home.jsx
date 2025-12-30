import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleList from "../components/ArticleList";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            BeyondChats Article Aggregator
          </h1>
          <p className="text-gray-500 mt-1">
            Comparing original articles with AI-enhanced versions
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <ArticleList articles={articles} />
      </main>
    </div>
  );
}
