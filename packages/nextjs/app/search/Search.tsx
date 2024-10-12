"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingBars } from "../../components/punk-society/LoadingBars";
// import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: nameToAddress } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "nameToAddress",
    args: [searchQuery],
    watch: true,
  });

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter an address or username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (searchQuery.length > 17) {
        // If the search query is longer than 17 characters, assume it's an Ethereum address
        router.push(`/profile/${searchQuery}`);
      } else if (nameToAddress && nameToAddress !== "0x0000000000000000000000000000000000000000") {
        // If the search query resolves to a non-zero address, navigate to the resolved address profile
        router.push(`/profile/${nameToAddress}`);
      } else {
        setError("Invalid address or username.");
      }
    } catch (error) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  gap-3">
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value.toLowerCase())}
        placeholder="Enter username or address"
        className="input input-bordered w-full max-w-xs"
      />
      {/* <AddressInput value={searchQuery} onChange={setSearchQuery} placeholder="Enter username or ENS" /> */}
      <button onClick={handleSearch} disabled={loading} className="btn btn-primary">
        {loading ? <LoadingBars /> : "Go"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
