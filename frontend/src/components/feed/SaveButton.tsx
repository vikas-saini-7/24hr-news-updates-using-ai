"use client";

import React, { useState } from "react";
import axios from "axios";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";

interface SaveButtonProps {
  articleId: string;
  initialSaved?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ articleId, initialSaved }) => {
  const [isSaved, setIsSaved] = useState(initialSaved || false);
  const [loading, setLoading] = useState(false);

  const toggleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 🔹 Optimistic UI update
      setIsSaved(!isSaved);

      if (isSaved) {
        // remove from saved
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/save/${articleId}`,
          {
            withCredentials: true,
          }
        );
      } else {
        // add to saved
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/save/${articleId}`,
          {},
          {
            withCredentials: true,
          }
        );
      }
    } catch (err) {
      console.error("Error toggling save:", err);
      // rollback if API fails
      setIsSaved(isSaved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      aria-label={isSaved ? "Unsave article" : "Save article"}
      className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition absolute top-1 right-1 cursor-pointer"
    >
      {isSaved ? (
        <IconBookmarkFilled className="w-5 h-5 text-yellow-400" />
      ) : (
        <IconBookmark className="w-5 h-5 text-white" />
      )}
    </button>
  );
};

export default SaveButton;
