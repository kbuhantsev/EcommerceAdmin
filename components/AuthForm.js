import React, { useCallback, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Input from "./Input";
import { useRouter } from "next/router";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      const user = await axios.post("api/register", {
        name,
        email,
        password,
      });
      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      const { response } = error;
      if (response?.data) {
        Notify.failure(response.data.error);
      }
    }
  }, [name, email, password]);

  const login = useCallback(async () => {
    try {
      const session = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (session.error) {
        Notify.failure(session.error);
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return (
    <div className="flex justify-center w-screen">
      <div className="bg-black bg-opacity-40 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
        <h2 className="text-white text-4xl mb-8 font-semibold">
          {variant === "login" ? "Sign in" : "Register"}
        </h2>
        <div className="flex flex-col gap-4">
          {variant === "register" && (
            <Input
              id="name"
              type="text"
              label="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={variant === "login" ? login : register}
          className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
        >
          {variant === "login" ? "Login" : "Sign up"}
        </button>
        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
          <div
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          >
            <FcGoogle size={32} />
          </div>
          <div
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          >
            <FaGithub size={32} />
          </div>
        </div>
        <p className="text-neutral-500 mt-12">
          {variant === "login" ? "First time?" : "Already have an account?"}
          <span
            onClick={toggleVariant}
            className="text-white ml-1 hover:underline cursor-pointer"
          >
            {variant === "login" ? "Create an account" : "Login"}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
