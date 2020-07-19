import { AuthenticationError } from "apollo-server-express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../mailer";
import * as randomstring from "randomstring";

export default async (_, args, ctx) => {
  let user = await ctx.db.collection("user").findOne({ email: args.email });
  if (user) {
    throw new AuthenticationError("This e-mail address is already in use");
  }

  const registration_key = randomstring.generate(16);

  user = await ctx.db.collection("user").insertOne({
    email: args.email,
    password: await argon2.hash(args.password),
    name: args.name,
    registration_key,
  });

  await sendMail(
    "Confirm your MH Distractions account",
    "register",
    `${args.name} <${args.email}>`,
    { name: args.name, registration_key }
  );

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
