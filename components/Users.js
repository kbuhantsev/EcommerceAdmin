import useSWR from "swr";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const updateUser = async (user) => {
  try {
    const result = await axios.put("/api/users", user);
    return result.data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

const Users = () => {
  const { data: users = [], isLoading, mutate } = useSWR("/api/users");

  const onUserChange = async (_id, checked) => {
    try {
      await mutate(updateUser({ _id, admin: checked }));
      Notify.success("Users updated");
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="">Users (selected is admins)</h2>
      {users.length > 0 &&
        users.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              id="admin"
              checked={user.admin}
              className="w-auto mr-2"
              disabled={isLoading}
              onChange={(e) => onUserChange(user._id, e.target.checked)}
            />
            <label htmlFor="admin">{user.name}</label>
          </div>
        ))}
    </div>
  );
};

export default Users;
