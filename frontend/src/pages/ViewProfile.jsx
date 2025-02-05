import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ViewProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="card-content flex-col lg:flex-row items-center">
          <img
            src={user?.photoURL}
            className="max-w-sm rounded-full shadow-2xl mb-4 lg:mb-0 "
            alt="User Profile"
          />
          <div className="text-center lg:text-left lg:ml-6">
            <h1 className="text-3xl font-bold mb-2">{user?.displayName}</h1>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            <a className="btn btn-primary" href="/setting">Edit Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;