import Nav from "@/components/Nav";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-slate-800 w-screen h-screen flex items-center">
        <div className="text-center w-full text-white"></div>
        <div>
          Not signed in <br />
          <button
            className="text-black bg-white p-2 px-4 rounded-lg hover:bg-gray-300
              transition-colors"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen">
      <div>Signed in as {session.user.email}</div>
      <Nav />
    </div>
  );
}
