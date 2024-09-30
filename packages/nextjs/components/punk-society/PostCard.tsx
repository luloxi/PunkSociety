"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProfileAddress } from "./ProfileAddress";
import { MagnifyingGlassPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  nftAddress?: string;
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const PostCard = ({ post }: { post: Post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`card-compact bg-base-300 w-[90%] lg:w-[300px] relative group rounded-lg`}>
        {/* Image Section */}
        {post.image && post.image !== "https://ipfs.io/ipfs/" && (
          <div className="relative w-full h-0 pb-[100%] overflow-hidden">
            <figure className="absolute inset-0">
              <Image
                src={post.image || "/path/to/default/image.png"}
                alt="NFT Image"
                className="w-full h-full rounded-lg object-cover"
                fill // Ensures the image fills the container
              />
              <button
                className="absolute bottom-2 right-2 bg-base-200 p-2 rounded-full shadow-lg"
                onClick={handleOpenModal}
              >
                <MagnifyingGlassPlusIcon className="inline-block h-7 w-7" />
              </button>
            </figure>
          </div>
        )}

        <div className="card-body space-y-3">
          <div className="flex flex-col justify-center mt-1">
            <p className="my-0 text-lg">{post.description ?? "No description available."}</p>
          </div>

          <div className="flex space-x-3 mt-1 items-center">
            <ProfileAddress address={post.user} />
          </div>
        </div>

        {/* Modal for fullscreen image */}
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <Image
              src={post.image || "/path/to/default/image.png"}
              alt="NFT Image"
              className="w-full h-auto rounded-lg object-cover"
              layout="responsive"
              width={800} // Adjust this to the desired fullscreen width
              height={800} // Adjust this to maintain the aspect ratio of the image
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

// Modal Component
export const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        ref={modalRef}
        className="relative rounded-lg p-4 max-h-screen overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <button className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full" onClick={onClose}>
          <XMarkIcon className="inline-block h-7 w-7" />
        </button>
        {children}
      </div>
    </div>
  );
};
