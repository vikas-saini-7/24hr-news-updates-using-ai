"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const page = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      {/* <h1 className="">Profile</h1> */}
      <div>
        {user && (
          <>
            <h1 className="text-2xl">Welcome, {user.name}!</h1>
            <h2>{user.email}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
