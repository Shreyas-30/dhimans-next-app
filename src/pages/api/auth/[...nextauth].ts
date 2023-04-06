import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECERT,
    }),
  ],
  secret: process.env.SESSION_SECRET,
  // callbacks: {
  //   async signIn({ account, profile, user }) {
  //     const whitelistEmails = [
  //       "chinmaya.dhiman@gmail.com",
  //       "shreyask3004@gmail.com",
  //     ];
  //     if (whitelistEmails.includes()) {
  //       return true;
  //     } else false;
  //   },
  // },
});
