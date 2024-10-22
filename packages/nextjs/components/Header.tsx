"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfigMenu } from "./punk-society/ConfigMenu";
import { PunkConnectButton } from "./punk-society/PunkConnectButton";
import { FaucetButton } from "./scaffold-eth";
import { BellIcon, EnvelopeIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

/**
 * Site header
 */
export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex lg:sticky  top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start ml-4 lg:ml-2">
        <div className="flex lg:hidden">
          {/* <ConfigMenu /> */}
          <div className="flex justify-center items-center ml-8 lg:ml-0">
            <Link href="/" passHref>
              <span className="inline-flex items-center gap-2">
                <strong>PunkSociety</strong>{" "}
                <span role="img" aria-label="emoji">
                  🤘
                </span>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-3 ">
          <Link href="/" passHref>
            <button
              className={`bg-transparent hover:bg-transparent border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <HomeIcon className="h-6 w-6" /> Home
              </div>
            </button>
          </Link>

          <Link href="/search" passHref>
            <button
              className={`bg-transparent hover:bg-bg-transparent border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/search" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <MagnifyingGlassIcon className="h-6 w-6" /> Search
              </div>
            </button>
          </Link>

          <Link href="/not-found" passHref>
            <button
              className={`bg-transparent text-red-600 hover:bg-transparent border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/notifications" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <BellIcon className="h-6 w-6" /> Notifications
              </div>
            </button>
          </Link>

          <Link href="/not-found" passHref>
            <button
              className={`bg-transparent text-red-600 hover:bg-transparent border-none hidden lg:flex flex-row items-center justify-center text-xl ${
                pathname === "/messages" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <EnvelopeIcon className="h-6 w-6" /> Messages
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className="navbar-center flex-1 justify-center items-center">
        <div className="hidden lg:flex">
          <Link href="/" passHref>
            <span className="inline-flex items-center gap-2">
              <strong>PunkSociety</strong>{" "}
              <span role="img" aria-label="emoji">
                🤘
              </span>
            </span>
          </Link>
        </div>
        {/* <div className="flex lg:hidden bg-base-200 rounded-full p-2">
          <span role="img" aria-label="PunkSociety logo">
            🤘
          </span>
        </div> */}
      </div>

      <div className="navbar-end relative ">
        <div className="flex justify-center items-center  ">
          <div className="flex items-center justify-center">
            <PunkConnectButton />
          </div>

          <div>
            <FaucetButton />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          {/* <div className="lg:mr-2"></div> */}

          <div className=" lg:ml-4 mr-4">
            <ConfigMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
