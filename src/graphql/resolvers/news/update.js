import { AuthenticationError } from "apollo-server-express";
import { ObjectID } from "mongodb";

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
    if (article._id.toString() !== args.id) {
      throw new Error("This slug is already in use");
    }

    // Is this moving from draft to published?
    if (article.status === "Draft" && args.article.status === "Published") {
      args.article.published = new Date().toISOString();
    }
  }

  await ctx.db
    .collection("news")
    .updateOne({ _id: new ObjectID(args.id) }, { $set: args.article });

  return await ctx.db
    .collection("news")
    .findOne({ _id: new ObjectID(args.id) });
};
