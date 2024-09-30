"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "./SwitchTheme";
import { useAccount } from "wagmi";
import { BellIcon, EnvelopeIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const { address: connectedAddress } = useAccount();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const defaultProfilePicture = "/guest-profile.jpg";

  const profilePicture = profileInfo && profileInfo[2] ? profileInfo[2] : defaultProfilePicture;

  const pathname = usePathname();

  return (
    <div className="flex lg:sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start ml-2">
        <div className="flex lg:hidden ml-2 items-center justify-center">
          <SwitchTheme />
        </div>
        <div className="flex flex-row gap-3">
          <Link href="/" passHref>
            <button
              className={`bg-transparent hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <HomeIcon className="h-6 w-6" />
              </div>
            </button>
          </Link>

          <Link href="/search" passHref>
            <button
              className={`bg-transparent hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/search" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </div>
            </button>
          </Link>

          <Link href="/not-found" passHref>
            <button
              className={`bg-transparent text-red-600 hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/notifications" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <BellIcon className="h-6 w-6" />
              </div>
            </button>
          </Link>

          <Link href="/not-found" passHref>
            <button
              className={`bg-transparent text-red-600 hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/messages" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className="navbar-center flex-1 flex  justify-center items-center">
        <Link href="/" passHref>
          <span className="inline-flex items-center gap-2">
            <strong>PunkSociety</strong>{" "}
            <span role="img" aria-label="emoji">
              🤘
            </span>
          </span>
        </Link>
      </div>

      <div className="navbar-end mr-4 relative">
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="hidden lg:flex">
            <SwitchTheme />
          </div>
          <Link href={`/profile/${connectedAddress}`} passHref>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundImage: `url(${profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Link>
        </div>
      </div>
    </div>
  );
};
