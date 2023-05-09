import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { sendPUTRequest } from "@/lib/fetcher";

const Users = () => {
  const { data: users = [] } = useSWR("/api/users");
  const { trigger, isMutating } = useSWRMutation("/api/users", sendPUTRequest);

  const onUserChange = async (_id, checked) => {
    try {
      await trigger({ _id, admin: checked });
      Notify.success("Users updated");
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="">Users</h2>
      {users.length > 0 &&
        users.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              id="admin"
              checked={user.admin}
              className="w-auto mr-2"
              disabled={isMutating}
              onChange={(e) => onUserChange(user._id, e.target.checked)}
            />
            <label htmlFor="admin">{user.name}</label>
          </div>
        ))}
    </div>
  );
};

export default Users;
