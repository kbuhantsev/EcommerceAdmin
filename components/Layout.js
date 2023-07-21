import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import AuthForm from "./AuthForm";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-slate-800 w-screen h-screen flex flex-col items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
