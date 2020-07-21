export default async (_, args, ctx) => {
  const params = { sort: { published: -1 } };
  const search = {};
  if (args.limit) {
    params.limit = args.limit;
  }
  if (args.publishedOnly || !ctx.user || !ctx.user.admin) {
    search.status = "Published";
  }

  return await ctx.db.collection("news").find(search, params).toArray();
};
