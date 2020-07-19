export default async (_, args, ctx) => {
  const params = { sort: { published: -1 } };
  if (args.limit) {
    params.limit = args.limit;
  }

  return await ctx.db.collection("news").find({}, params).toArray();
};
