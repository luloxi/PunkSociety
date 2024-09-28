import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Create from "../app/create/Create";
import Modal from "../app/create/Modal";
import { HeartIcon } from "@heroicons/react/24/outline";
import { BellIcon, EnvelopeIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

// Import Modal

/**
 * Site footer
 */
export const Footer = () => {
  const pathname = usePathname();
  const [showPlusIcon, setShowPlusIcon] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowPlusIcon(false);
      } else {
        // Scrolling up
        setShowPlusIcon(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed bottom-16 lg:bottom-8 right-8 p-3 bg-blue-600 cursor-pointer hover:bg-blue-800 text-white rounded-full shadow-lg ${
          showPlusIcon ? "animate-show" : "animate-hide"
        }`}
        onClick={openModal}
      >
        <PlusIcon className="h-10 w-10" />
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Create onClose={closeModal} />
        </Modal>
      )}
      <div className="min-h-0 py-5 px-1 lg:mb-0">
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
      <footer className="sticky lg:hidden bottom-0 w-full bg-base-100 px-4 py-2 flex justify-around items-center">
        <Link href="/" passHref>
          <HomeIcon className={`h-6 w-6 ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`} />
        </Link>

        <Link href="/not-found" passHref>
          <MagnifyingGlassIcon
            className={`h-6 w-6 text-red-600 ${pathname === "/search" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>

        <Link href="/not-found" passHref>
          <BellIcon
            className={`h-6 w-6 text-red-600 ${
              pathname === "/notifications" ? "text-blue-600" : "hover:text-blue-600"
            }`}
          />
        </Link>

        <Link href="/not-found" passHref>
          <EnvelopeIcon
            className={`h-6 w-6 text-red-600 ${pathname === "/messages" ? "text-blue-600" : "hover:text-blue-600"}`}
          />
        </Link>
      </footer>
    </>
  );
};
