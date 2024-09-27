import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faBell, faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeartIcon } from "@heroicons/react/24/outline";

/**
 * Site footer
 */
export const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
        <div>
          <div className="fixed flex justify-end items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none"></div>
        </div>
        <div className="w-full">
          <ul className="menu menu-horizontal w-full">
            <div className="flex justify-center items-center gap-2 text-sm w-full">
              <div className="text-center">
                <a href="https://github.com/luloxi/PunkSociety/" target="_blank" rel="noreferrer" className="link">
                  Fork me
                </a>
              </div>
              <span>·</span>
              <div className="flex justify-center items-center gap-2">
                <p className="m-0 text-center">
                  Built with <HeartIcon className="inline-block h-4 w-4" /> by
                </p>
                <a
                  className="flex justify-center items-center gap-1"
                  href="https://x.com/LuloxDev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="link">Lulox</span>
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <footer className="sticky lg:hidden bottom-0 w-full bg-base-100 px-4 py-2 flex justify-between items-center">
        <Link href="/" passHref>
          <FontAwesomeIcon
            icon={faHome}
            className={`h-6 w-6 ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>

        <Link href="/create" passHref>
          <FontAwesomeIcon
            icon={faPlus}
            className={`h-6 w-6 ${pathname === "/create" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>

        <Link href="/not-found" passHref>
          <FontAwesomeIcon
            icon={faSearch}
            className={`h-6 w-6 text-red-500 ${pathname === "/profile" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>

        <Link href="/not-found" passHref>
          <FontAwesomeIcon
            icon={faBell}
            className={`h-6 w-6 text-red-500 ${pathname === "/search" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>
      </footer>
    </>
  );
};
