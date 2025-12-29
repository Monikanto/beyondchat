export default function ArticleCard({ article, type }) {
  if (!article?.content) {
    return (
      <div style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
        background: "#f9f9f9"
      }}>
        <h3>{article?.title || "Untitled Article"} ({type})</h3>
        <p style={{ color: "#888" }}>
          Content not available for this article.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "16px"
    }}>
      <h3>
        {article.title}{" "}
        <span style={{
          fontSize: "12px",
          color: type === "updated" ? "green" : "blue"
        }}>
          ({type})
        </span>
      </h3>

      <p style={{ whiteSpace: "pre-wrap" }}>
        {article.content.slice(0, 500)}...
      </p>
    </div>
  );
}
