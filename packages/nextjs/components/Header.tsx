"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "./SwitchTheme";
import { useAccount } from "wagmi";
import { Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const { address: connectedAddress } = useAccount();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const defaultProfilePicture = "/guest-profile.jpg";

  const profilePicture = profileInfo && profileInfo[2] ? profileInfo[2] : defaultProfilePicture;

  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

  const closeSettingsMenu = () => {
    setIsSettingsMenuOpen(false);
  };

  useOutsideClick(menuRef, closeSettingsMenu);

  return (
    <div className="flex lg:sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start ml-2">
        <div className="flex lg:hidden ml-2 items-center justify-center">
          <Cog6ToothIcon onClick={toggleSettingsMenu} className="cursor-pointer h-6 w-6" />
          {/* <Cog6ToothIcon className="h-6 w-6" /> */}
          {isSettingsMenuOpen && (
            <div className="absolute left-5 top-10 mt-2 w-48 bg-base-300 shadow-lg rounded-lg">
              <div className="flex flex-col justify-center items-center my-2 gap-1">
                <RainbowKitCustomConnectButton />
                <SwitchTheme />
                <FaucetButton />
              </div>
            </div>
          )}
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

                <span>Home</span>
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

                <span>Search</span>
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

      <div className="navbar-end mr-4 relative" ref={menuRef}>
        <div className="flex flex-row items-center justify-center gap-3">
          <Cog6ToothIcon onClick={toggleSettingsMenu} className="cursor-pointer h-6 w-6" />
          {/* <Cog6ToothIcon className="h-6 w-6" /> */}
          {isSettingsMenuOpen && (
            <div className="absolute right-5 top-10 mt-2 w-48 bg-base-300 shadow-lg rounded-lg">
              <div className="flex flex-col justify-center items-center my-2 gap-1">
                <RainbowKitCustomConnectButton />
                <SwitchTheme />
                <FaucetButton />
              </div>
            </div>
          )}
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
          {/* {isConnected ? (
            <>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleMenuToggle}
                style={{
                  backgroundImage: `url(${profilePicture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </>
          ) : (
            <>
              <RainbowKitCustomConnectButton />
            </>
          )}
          {isMenuOpen && isConnected && (
            <div className="absolute flex flex-col items-center justify-center right-0 top-10 mt-2 w-48 bg-base-300 shadow-lg rounded-lg">
              <div className="my-2 flex flex-row items-center justify-center gap-2">
                <Link href={`/profile/${connectedAddress}`} passHref>
                  <span className="btn btn-primary bg-base-200 border-0" onClick={handleMenuClose}>
                    My Profile
                  </span>
                </Link>
                <FaucetButton />
              </div>

              <div className="mb-2">
                <RainbowKitCustomConnectButton />
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
