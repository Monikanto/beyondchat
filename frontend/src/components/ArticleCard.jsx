export default function ArticleCard({ article, type }) {
  if (!article?.content) return null;

  const badgeStyles =
    type === "updated"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {article.title}
        </h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyles}`}
        >
          {type}
        </span>
      </div>

      <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
        {article.content.slice(0, 700)}...
      </p>
    </div>
  );
}
