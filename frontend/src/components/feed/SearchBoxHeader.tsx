"use client";
import { IconSearch } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const SearchBoxHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";

  const [search, setSearch] = useState(queryFromUrl);

  // Sync input with URL
  useEffect(() => {
    setSearch(queryFromUrl);
  }, [queryFromUrl]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/feed/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onKeyDown={handleSubmit}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="px-3 py-1 border rounded-xl border-gray-500/20 bg-gray-500/10 hidden md:block"
      />
      <div className="md:hidden h-10 flex items-center opacity-0">
        <IconSearch />
      </div>
    </div>
  );
};

export default SearchBoxHeader;
