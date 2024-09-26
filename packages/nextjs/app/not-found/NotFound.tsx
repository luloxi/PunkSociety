"use client";

import { NextPage } from "next";

export const NotFound: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-2">
      {/* Not Found Section */}
      <div className="relative text-red-500 flex flex-col justify-center items-center bg-base-100 p-6 rounded-lg shadow-md w-full">
        <p className="font-bold text-2xl">Page under development</p>
        <p>Oops, sorry! No content here yet!</p>
      </div>
    </div>
  );
};
