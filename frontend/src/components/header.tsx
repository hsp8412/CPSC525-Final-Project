"use client";
import {AuthContext} from "@/context/authContext";
import {useContext} from "react";

const Header = () => {
  const {user, loading} = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("voter_token");
    alert("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between mb-5 items-center">
      <p className="font-bold text-4xl">
        Hi, {user?.firstName} {user?.lastName}
      </p>
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-400 text-xl px-3 py-2 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
