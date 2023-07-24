import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { EcommerceAdminSVG, HamburgerSVG } from "./Icons";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  const { data: session, status } = useSession();

  //console.log(status);

  if (!session) {
    return (
      <div className="bg-slate-800 w-screen h-screen flex flex-col items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="flex items-center md:hidden p-4">
        <button onClick={() => setShowNav(!showNav)}>
          <HamburgerSVG />
        </button>
        <div className="flex grow justify-center pr-4">
          <Logo />
        </div>
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// Нужно доделать, скачет интерфейс

// useSession() returns an object containing two values: data and status:

// data: This can be three values: Session / undefined / null.
// when the session hasn't been fetched yet, data will be undefined
// in case it failed to retrieve the session, data will be null
// in case of success, data will be Session.
// status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"
