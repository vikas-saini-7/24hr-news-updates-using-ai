"use client";
import React, { useState } from "react";
import Modal from "../reusables/Modal";
import { IconTrash, IconAlertTriangle } from "@tabler/icons-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  userEmail: string;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onDelete,
  userEmail,
}: DeleteAccountModalProps) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    if (confirmEmail !== userEmail) {
      setError("Email does not match. Please type your exact email address.");
      return;
    }

    try {
      setIsLoading(true);
      await onDelete();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmEmail("");
    setError("");
    onClose();
  };

  const isDeleteEnabled = confirmEmail === userEmail && !isLoading;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete Account">
      <div className="space-y-6">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <IconAlertTriangle className="text-red-400" size={24} />
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-red-400">
            This action cannot be undone!
          </h3>
          <p className="text-white/70 text-sm">
            Deleting your account will permanently remove all your data,
            including your profile, settings, and any associated information.
          </p>
        </div>

        {/* Confirmation Box */}
        <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <IconTrash className="text-red-400 mt-0.5" size={20} />
            <div className="space-y-2">
              <p className="text-red-300 text-sm font-medium">
                To confirm deletion, please type your email address below:
              </p>
              <p className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Email Confirmation Input */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Type your email to confirm
          </label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
            placeholder="Enter your email address"
            autoComplete="off"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 justify-end">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!isDeleteEnabled}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
