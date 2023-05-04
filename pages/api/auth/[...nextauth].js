import clientPromise from "@/lib/mongodb";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["k.buhantsev@gmail.com"];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required!");
        }

        const user = await User.findOne({ email: credentials.email }).exec();
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist!");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password!");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/",
    //error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    throw "Not an admin";
  }
}
