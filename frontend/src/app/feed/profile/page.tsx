"use client";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import {
  IconEdit,
  IconMail,
  IconCalendar,
  IconCrown,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");

  if (!user) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-white/60">Please log in to view your profile.</div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving name:", editName);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-white/60">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 flex items-center justify-center text-black font-bold text-2xl">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-2xl font-bold bg-white/10 px-3 py-1 rounded-lg border border-white/20 focus:outline-none focus:border-orange-400"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                )}

                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold uppercase tracking-wide">
                  {user.plan}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/60 mb-4">
                <IconMail size={16} />
                <span>{user.email}</span>
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user.name || "");
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                  >
                    <IconEdit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Plan Information */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconCrown className="text-orange-400" size={20} />
              <h3 className="text-lg font-semibold">Current Plan</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Plan Type</span>
                <span className="font-medium">{user.plan}</span>
              </div>

              {user.plan === "FREE" && (
                <div className="mt-4">
                  <Link href="/go-premium">
                    <button className="w-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
                      Upgrade to Premium
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <IconUser className="text-blue-400" size={20} />
              <h3 className="text-lg font-semibold">Account Info</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60">User ID</span>
                <span className="font-mono text-sm">{user.id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/60">Member Since</span>
                <span className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/60">Last Updated</span>
                <span className="text-sm">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/change-password">
              <button className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-300 font-medium transition-colors">
                Change Password
              </button>
            </Link>

            <button
              onClick={() => alert("Coming Soon")}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl text-red-300 font-medium transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
