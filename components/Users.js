import axios from "axios";
import React, { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    console.log("useEffect");
  }, []);

  const getUsers = async () => {
    const result = await axios.get("/api/users");
    setUsers(result.data);
  };

  const onUserChange = (_id, checked) => {
    setUsers((prev) => {
      return [...prev].map((user) => {
        if (user._id === _id) {
          user.admin = checked;
        }
        return user;
      });
    });
  };

  const saveUsers = async () => {
    const admins = users.filter((user) => user.admin);
    if (admins.length === 0) {
      Notify.failure("There is no admin users left!");
      return;
    }

    for (const user of users) {
      await axios.put("/api/users", user);
    }

    Notify.success("Users updated");
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
              onChange={(e) => onUserChange(user._id, e.target.checked)}
            />
            <label htmlFor="admin">{user.name}</label>
          </div>
        ))}
      <button
        type="button"
        className="btn-primary py-1 mt-2"
        onClick={saveUsers}
      >
        Save
      </button>
    </div>
  );
};

export default Users;
