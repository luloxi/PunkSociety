"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../explore/_components/LoadingSpinner";
import { InputBase } from "~~/components/scaffold-eth";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter an address.");
      return;
    }

    setLoading(true);
    setError("");

    const address = searchQuery;

    // If the search query is not an address, show an error
    if (!/^0x[a-fA-F0-9]{40}$/.test(searchQuery)) {
      setError("Invalid address format.");
      setLoading(false);
      return;
    }

    // Redirect to the user's profile page
    router.push(`/profile/${address}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Search for Users</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <InputBase placeholder="Enter address" value={searchQuery} onChange={setSearchQuery} />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full border-0 bg-orange-600 rounded-lg text-white py-2 px-4"
        >
          Search
        </button>
      </div>
    </div>
  );
};
