export default async (_, args, ctx) => {
  return await ctx.db.collection("teams").find({}).toArray();
};
