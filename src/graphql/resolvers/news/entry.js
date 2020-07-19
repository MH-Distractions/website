export default async (_, args, ctx) => {
  return await ctx.db.collection("news").findOne({ slug: args.slug });
};
