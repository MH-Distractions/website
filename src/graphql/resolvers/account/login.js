import { AuthenticationError } from "apollo-server-express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export default async (_, args, ctx) => {
  const user = await ctx.db.collection("user").findOne({ email: args.email });
  if (!user || !(await argon2.verify(user.password, args.password))) {
    throw new AuthenticationError("Invalid e-mail address or password");
  }

  const token = jwt.sign(
    {
      sub: user._id,
    },
    process.env.JWT_KEY,
    {
      issuer: "mhdistractions",
      expiresIn: "6h",
    }
  );

  return { token };
};
