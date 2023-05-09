import Layout from "@/components/Layout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useState } from "react";
import FaUserCircle from "react-icons/fa";

export default function Home() {
  const { data: user } = useCurrentUser();

  const [avatarError, setAvatarError] = useState(false);

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2 className="">
          Hello, <b>{user?.name}</b>
        </h2>
        <div className="flex gap-2 items-center">
          {avatarError ? (
            <FaUserCircle className="h-12" />
          ) : (
            <img
              src={user?.image}
              alt="user avatar"
              className="h-12 rounded-full"
              onError={() => setAvatarError(true)}
            />
          )}

          <span>{user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
