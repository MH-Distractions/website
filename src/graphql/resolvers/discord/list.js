export default async (_, args, ctx) => {
  return await ctx.db.collection("discord").find({}).toArray();
};
