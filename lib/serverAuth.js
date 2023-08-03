import { getSession } from "next-auth/react";
import { mongooseConnect } from "./connectMongo";
import { User } from "@/models/User";

const serverAuth = async (req) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  await mongooseConnect();
  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
