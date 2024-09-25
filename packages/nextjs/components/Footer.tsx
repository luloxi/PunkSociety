// import React from "react";
// import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { hardhat } from "viem/chains";
// import Image from "next/image";
import { useAccount } from "wagmi";
// import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
// import { SwitchTheme } from "~~/components/SwitchTheme";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// import { Faucet } from "~~/components/scaffold-eth";
// import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

// import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
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

  // const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  // const { targetNetwork } = useTargetNetwork();
  // const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <>
      <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
        <div>
          {/* <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none"> */}
          <div className="fixed flex justify-end items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
            {/* <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div> */}
            {/* <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} /> */}
          </div>
        </div>
        <div className="w-full">
          <ul className="menu menu-horizontal w-full">
            <div className="flex justify-center items-center gap-2 text-sm w-full">
              <div className="text-center">
                <a href="https://github.com/luloxi/DARTE" target="_blank" rel="noreferrer" className="link">
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
      <div className="sticky lg:hidden bottom-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
        <div className="navbar-start ml-4 ">
          <Link href="/" passHref>
            <FontAwesomeIcon
              icon={faHome}
              className={`h-6 w-6 ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`}
            />
          </Link>
        </div>

        <div className="navbar-center flex-1 flex justify-center items-center">
          <Link href="/create" passHref>
            <button
              className={`btn btn-ghost hidden lg:flex flex-row items-center justify-center text-2xl ${
                pathname === "/create" ? "text-blue-600" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                <span>Create</span>
              </div>
            </button>
            <button
              className={`font-bold lg:hidden flex items-center justify-center text-3xl ${
                pathname === "/create" ? "text-blue-600" : ""
              }`}
            >
              <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
            </button>
          </Link>
        </div>

        <div className="navbar-end mr-4 relative" ref={menuRef}>
          {isConnected ? (
            // <>

            //   <div className="hidden lg:flex items-center gap-2 pr-4 cursor-pointer" onClick={handleMintUSDC}>
            //     {/* Wrap Image in a div and set explicit width/height */}
            //     <div className="w-7 h-7 relative">
            //       <Image
            //         src="/usdc-logo.png" // Ensure you use the correct path for Next.js
            //         alt="USDC Logo"
            //         width={28} // 7 * 4px = 28px
            //         height={28} // 7 * 4px = 28px
            //         style={{ objectFit: "contain" }} // Ensures the image behaves like 'object-contain'
            //       />
            //     </div>

            //     <span className="text-md text-cyan-600 font-bold">{usdcBalance ? Number(usdcBalance) / 1e6 : 0}</span>
            //   </div>
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
            <RainbowKitCustomConnectButton />
          )}
          {isMenuOpen && isConnected && (
            <div className="absolute flex flex-col items-center justify-center right-0 bottom-16 mt-2 w-48 bg-base-300 shadow-lg rounded-lg">
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
    </>
  );
};
