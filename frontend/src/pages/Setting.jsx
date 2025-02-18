import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Setting = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(displayName, photoURL);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile picture</span>
            </label>
            <input
              type="text"
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-red text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;