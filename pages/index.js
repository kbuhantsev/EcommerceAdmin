import Layout from "@/components/Layout";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2 className="">
          Hello, <b>{user?.name}</b>
        </h2>
        <div className="flex gap-2 items-center">
          <img
            src={user?.image}
            alt="user avatar"
            className="h-12 rounded-full"
          />
          <span>{user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
