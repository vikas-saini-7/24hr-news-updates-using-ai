"use client";

import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-blue-400 hover:underline text-sm flex items-center"
    >
      <IconChevronLeft className="mr-1" size={20} /> Back to News
    </button>
  );
}
