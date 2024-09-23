"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Image from "next/image";
import { useAccount } from "wagmi";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Explore",
    href: "/",
  },
  {
    label: "Create",
    href: "/create",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "text-blue-600 font-bold" : ""
              } hover:text-blue-600 font-bold py-3 px-3 text-sm rounded-full gap-2 grid grid-flow-col no-bg no-shadow`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const pathname = usePathname(); // Add this line to track the active route

  const { address: connectedAddress, isConnected } = useAccount();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const defaultProfilePicture = "https://ipfs.io/ipfs/QmVCvzEQHFKzAYSsou8jEJtWdFj31n2XgPpbLjbZqui4YY";

  const profilePicture = profileInfo && profileInfo[2] ? profileInfo[2] : defaultProfilePicture;

  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    menuRef,
    useCallback(() => setIsMenuOpen(false), []),
  );

  return (
    <div className="sticky lg:sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-24 h-10">
            <span className="text-3xl font-bold">DARTE</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>

      <div className="navbar-end pr-2 relative" ref={menuRef}>
        {isConnected ? (
          <div
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundImage: `url(${profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <RainbowKitCustomConnectButton />
        )}
        {isMenuOpen && isConnected && (
          <div className="absolute flex flex-col items-center justify-center right-0 top-10 mt-2 w-48 bg-base-100 shadow-lg rounded-lg">
            <RainbowKitCustomConnectButton />
            <div className="pt-2 mb-2 flex flex-row items-center justify-center gap-2">
              <Link href="/myProfile" passHref>
                <span className="btn btn-primary">My Profile</span>
              </Link>
              <FaucetButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
