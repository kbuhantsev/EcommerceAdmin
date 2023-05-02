import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2 className="">
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-2 items-center">
          <img
            src={session?.user?.image}
            alt="user avatar"
            className="h-12 rounded-full"
          />
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
