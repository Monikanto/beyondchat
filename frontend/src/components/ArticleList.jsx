import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
const originals = articles.filter(
  a => a.version === "original" && a.content
);


  return (
    <>
      {originals.map(original => {
        const updated = articles.find(
          a => a.parentArticleId === original._id
        );

        return (
          <div key={original._id} style={{ marginBottom: "40px" }}>
            <ArticleCard article={original} type="original" />
            {updated && (
              <ArticleCard article={updated} type="updated" />
            )}
          </div>
        );
      })}
    </>
  );
}
