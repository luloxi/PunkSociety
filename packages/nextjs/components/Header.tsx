"use client";

import React, { useCallback, useRef, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "./SwitchTheme";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hardhat } from "viem/chains";
// import Image from "next/image";
import { useAccount } from "wagmi";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

// import { notification } from "~~/utils/scaffold-eth";

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
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const pathname = usePathname(); // Add this line to track the active route

  const { address: connectedAddress, isConnected } = useAccount();
  // const { writeContractAsync: usdcWriteAsync } = useScaffoldWriteContract("MockUSDC");

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  // const { data: usdcBalance } = useScaffoldReadContract({
  //   contractName: "MockUSDC",
  //   functionName: "balanceOf",
  //   args: [connectedAddress],
  //   watch: true,
  // });

  // const handleMintUSDC = async () => {
  //   try {
  //     await usdcWriteAsync({
  //       functionName: "mint",
  //       args: [connectedAddress, BigInt(100e6)], // Mint 1 USDC
  //     });

  //     notification.success("USDC Minted Successfully");
  //   } catch (error) {
  //     console.error("Error during minting:", error);

  //     // Log the error and notify the user
  //     notification.error("Minting failed, please try again.");
  //   }
  // };

  const defaultProfilePicture = "https://ipfs.io/ipfs/QmVCvzEQHFKzAYSsou8jEJtWdFj31n2XgPpbLjbZqui4YY";

  const profilePicture = profileInfo && profileInfo[2] ? profileInfo[2] : defaultProfilePicture;

  // const burgerMenuRef = useRef<HTMLDivElement>(null);
  // useOutsideClick(
  //   burgerMenuRef,
  //   useCallback(() => setIsDrawerOpen(false), []),
  // );

  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useOutsideClick(
    menuRef,
    useCallback(() => setIsMenuOpen(false), []),
  );

  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="flex lg:sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start ml-2">
        <div className="flex lg:hidden ml-2 items-center justify-center">
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
        <div className="flex flex-row gap-3">
          <Link href="/" passHref>
            <button
              className={`bg-transparent hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-2xl ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
                <span>Home</span>
              </div>
            </button>
          </Link>
          <Link href="/create" passHref>
            <button
              className={` bg-transparent hover:bg-base-200 border-none hidden lg:flex flex-row items-center justify-center text-2xl ${
                pathname === "/create" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                <span>Create</span>
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className="navbar-center flex-1 flex justify-center items-center">
        <Link href="/" passHref>
          <span className={`text-2xl font-bold hover:text-blue-600 ${pathname === "/" ? "" : ""}`}>🦄</span>
        </Link>
      </div>

      <div className="navbar-end mr-4 relative" ref={menuRef}>
        <div className="flex flex-row items-center justify-center">
          <SwitchTheme
            className={`mr-4 hidden lg:flex pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`}
          />
          {isConnected ? (
            <>
              <div
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  backgroundImage: `url(${profilePicture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </>
          ) : (
            <>
              {/* <SwitchTheme className={`mr-4 pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} /> */}
              <RainbowKitCustomConnectButton />
            </>
          )}
          {isMenuOpen && isConnected && (
            <div className="absolute flex flex-col items-center justify-center right-0 top-10 mt-2 w-48 bg-base-300 shadow-lg rounded-lg">
              <div className="pt-2">
                <RainbowKitCustomConnectButton />
              </div>

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
    </div>
  );
};
