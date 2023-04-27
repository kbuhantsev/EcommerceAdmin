import Nav from "@/components/Nav";
import { signIn, useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-slate-800 w-screen h-screen flex flex-col items-center justify-center">
        <div className="text-center w-full text-white">
          Not signed in <br />
        </div>
        <div>
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
    <div className="bg-blue-900 min-h-screen flex ">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
