'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  password: string;
  requests: Request[];
}

interface Request {
  date: string;
  cart: { title: string;  quantity: number }[];
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // گرفتن لیست کاربران از بک‌اند
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (username: string ) => {
    if (window.confirm(`Are you sure you want to delete ${username}?`)) {
      try {
        await axios.delete(`https://fakestoreapi.com/users/${username}`);
        setUsers(users.filter((user) => user.username !== username));
        alert(`${username} has been deleted.`);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const viewRequests = async (username: string) => {
    try {
      const response = await axios.get(`/api/users/${username}/requests`);
      const requests: Request[] = response.data;

      if (!requests || requests.length === 0) {
        alert("This user has no requests.");
        return;
      }

      const formattedRequests = requests
        .map((req, index) => {
          const products = req.cart
            .map((item) => `${item.title} (${item.quantity})`)
            .join(", ");
          return `Request #${index + 1}:\nDate: ${new Date(req.date).toLocaleString()}\nProducts: ${products}`;
        })
        .join("\n\n");

      alert(formattedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to fetch requests.");
    }
  };

  const addUser = async () => {
    if (!newUsername || !newPassword) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      const newUser: User = { username: newUsername  ,   password: newPassword , requests: [] };
      await axios.post("https://fakestoreapi.com/users", newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUsername("");
      setNewPassword("");
  
      alert("User added successfully.");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      {/* فرم افزودن کاربر */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New User</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <table className="w-full  border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Password</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => viewRequests(user.username)}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Requests
                  </button>
                  <button
                    onClick={() => deleteUser(user.username)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
