import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  const originals = articles.filter(
    a => a.version === "original" && a.content
  );

  if (originals.length === 0) {
    return (
      <p className="text-gray-500">
        No articles available yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {originals.map(original => {
        const updated = articles.find(
          a => a.parentArticleId === original._id
        );

        return (
          <div
            key={original._id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <ArticleCard article={original} type="original" />
            {updated && (
              <ArticleCard article={updated} type="updated" />
            )}
          </div>
        );
      })}
    </div>
  );
}
