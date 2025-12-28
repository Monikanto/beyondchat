const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    content: String,
    publishedAt: Date,
    source: {
      type: String,
      default: "BeyondChats",
    },
    version: {
      type: String,
      enum: ["original", "updated"],
      default: "original",
    },
    parentArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
