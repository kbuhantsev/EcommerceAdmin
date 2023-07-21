import Layout from "../components/Layout";
import useCurrentUser from "../hooks/useCurrentUser";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Home() {
  const [avatarError, setAvatarError] = useState(false);

  const { data: user } = useCurrentUser();

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{user?.name}</b>
        </h2>
        <div className="flex gap-2 items-center">
          {avatarError ? (
            <FaUserCircle size={48} />
          ) : (
            <img
              src={user?.image}
              alt="user avatar"
              className="h-12 rounded-full"
              onError={() => setAvatarError(true)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
