import { AuthenticationError } from "apollo-server-express";

export default async (_, args, ctx) => {
  // Only admins can do this
  if (!ctx.user.user.admin) {
    throw new AuthenticationError(
      "You do not have permission to access this functionality"
    );
  }

  // Fetch any existing article with the slug
  const article = await ctx.db
    .collection("news")
    .findOne({ slug: args.article.slug });

  // Is slug already in use for a different article?
  if (article) {
    throw new Error("This slug is already in use");
  }

  // Is this being published?
  if (args.article.status === "Published") {
    args.article.published = new Date().toISOString();
  }

  const result = await ctx.db.collection("news").insertOne(args.article);

  return await ctx.db.collection("news").findOne({ _id: result.insertedId });
};
