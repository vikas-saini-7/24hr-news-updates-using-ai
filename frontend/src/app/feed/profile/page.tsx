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
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import DeleteAccountModal from "@/components/profile/DeleteAccountModal";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-white/60">Please log in to view your profile.</div>
      </div>
    );
  }

  const handleSave = (name: string) => {
    // TODO: Implement save functionality
    console.log("Saving name:", name);
  };

  const handlePasswordChange = async (
    currentPassword: string,
    newPassword: string
  ) => {
    // TODO: Implement password change functionality
    console.log("Changing password");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleDeleteAccount = async () => {
    // TODO: Implement delete account functionality
    console.log("Deleting account");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // After successful deletion, you might want to redirect or logout
    alert("Account deleted successfully");
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-white/60">
            Manage your account settings and preferences
          </p>
        </div> */}

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
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold uppercase tracking-wide">
                  {user.plan}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/60 mb-4">
                <IconMail size={16} />
                <span>{user.email}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                >
                  <IconEdit size={16} />
                  Edit Profile
                </button>
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
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-300 font-medium transition-colors"
            >
              Change Password
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl text-red-300 font-medium transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSave}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handlePasswordChange}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
        userEmail={user.email || ""}
      />
    </div>
  );
};

export default ProfilePage;
