"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Image from "next/image";
import { useAccount } from "wagmi";
// import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

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
  const { writeContractAsync: usdcWriteAsync } = useScaffoldWriteContract("MockUSDC");

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const { data: usdcBalance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

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

  const handleMintUSDC = async () => {
    try {
      await usdcWriteAsync({
        functionName: "mint",
        args: [connectedAddress, BigInt(100e6)], // Mint 1 USDC
      });

      notification.success("USDC Minted Successfully");
    } catch (error) {
      console.error("Error during minting:", error);

      // Log the error and notify the user
      notification.error("Minting failed, please try again.");
    }
  };

  return (
    <div className="sticky lg:sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start ml-2">
        <Link href="/create" passHref>
          <button className={`btn  text-3xl ${pathname === "/create" ? "text-blue-600" : "hover:text-blue-600"}`}>
            +
          </button>
        </Link>
      </div>

      <div className="navbar-center flex-1 flex justify-center items-center">
        <Link href="/" passHref>
          <span className={`text-3xl font-bold ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`}>
            DARTE
          </span>
        </Link>
      </div>

      <div className="navbar-end pr-4 relative" ref={menuRef}>
        {isConnected ? (
          <>
            <div className="hidden lg:flex items-center gap-2 pr-4 cursor-pointer" onClick={handleMintUSDC}>
              {/* <button className="btn btn-primary btn-sm" onClick={handleMintUSDC}>
                +
              </button> */}

              {/* Wrap Image in a div and set explicit width/height */}
              <div className="w-7 h-7 relative">
                <Image
                  src="/usdc-logo.png" // Ensure you use the correct path for Next.js
                  alt="USDC Logo"
                  width={28} // 7 * 4px = 28px
                  height={28} // 7 * 4px = 28px
                  style={{ objectFit: "contain" }} // Ensures the image behaves like 'object-contain'
                />
              </div>

              <p className="text-md text-cyan-600 font-bold">{usdcBalance ? Number(usdcBalance) / 1e6 : 0}</p>
            </div>
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
