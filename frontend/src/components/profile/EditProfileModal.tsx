"use client";
import React, { useState } from "react";
import Modal from "../reusables/Modal";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
  };
  onSave: (name: string) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) {
  const [editName, setEditName] = useState(user.name || "");

  const handleSave = () => {
    onSave(editName);
    onClose();
  };

  const handleCancel = () => {
    setEditName(user.name || "");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Edit Profile">
      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 flex items-center justify-center text-black font-bold text-2xl">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 cursor-not-allowed"
            />
            <p className="text-xs text-white/40 mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editName.trim()}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
