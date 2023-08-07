import clientPromise from "@/lib/mongodb";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { mongooseConnect } from "@/lib/connectMongo";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

        // if (!user.admin) {
        //   throw new Error(`Permission denied for ${user.email}`);
        // }

        return user;
      },
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      name: "github",
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    // session: async ({ session }) => {
    //   await mongooseConnect();
    //   const adminEmails = await User.find({ admin: true }, "email");
    //   if (adminEmails.find(({ email }) => email === session?.user?.email)) {
    //     return session;
    //   } else {
    //     console.log(`
    //     !!-- permission denied for ${session?.user?.email}`);
    //     return false;
    //   }
    // },
  },
  pages: {
    signIn: "/",
  },
  //debug: process.env.NODE_ENV === "development",
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
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);

  const admins = await User.find(
    {
      admin: true,
      email: session?.user?.email,
    },
    "email"
  );
  console.log(admins);
  if (admins.length) {
    return true;
  } else {
    return false;
  }
}
