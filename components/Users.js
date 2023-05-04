import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await axios.get("/api/users");
    setUsers(result.data);
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
              value={user.admin}
              checked={user.admin}
              className="w-auto mr-2"
            />
            <label for="admin">{user.name}</label>
          </div>
        ))}
    </div>
  );
};

export default Users;
