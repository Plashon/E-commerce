import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const changeRole = async (email, currentRole) => {
     try {
      if (currentRole === "user") {
        await UserService.makeAdmin(email);
      } else {
        await UserService.makeUser(email);
      }

      // อัปเดต UI โดยเปลี่ยน role ใน state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, role: currentRole === "user" ? "admin" : "user" }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: `Role updated successfully!`,
        text: `${email} is now a ${currentRole === "user" ? "Admin" : "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
  return (
    <div className="container mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Manage Users
        </h1>

        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <span>User</span>
                    <input
                      type="checkbox"
                      className="toggle border-sky-400 bg-sky-400 hover:bg-blue-700"
                      checked={user.role === "admin"}
                      onChange={() => changeRole(user.email,user.role)}
                    />
                    <span>Admin</span>
                  </td>
                  <td className="py-3 px-4 gap-2 ">
                    <button className="btn btn-sm btn-info text-white mr-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
