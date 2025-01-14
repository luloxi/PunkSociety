import { useRef, useState } from "react";
import Link from "next/link";
import { PunkBalance } from "../PunkBalance";
import { NetworkOptions } from "./NetworkOptions";
// import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { getAddress } from "viem";
import { Address } from "viem";
import { useAccount, useDisconnect } from "wagmi";
import { UserIcon } from "@heroicons/react/24/outline";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon, ArrowUpLeftIcon } from "@heroicons/react/24/solid";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({ address }: AddressInfoDropdownProps) => {
  const [selectingNetwork, setSelectingNetwork] = useState(false);

  const checkSumAddress = getAddress(address);
  const { address: connectedAddress } = useAccount();
  const { disconnect } = useDisconnect();

  // const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || "";

  // const onrampBuyUrl = getOnrampBuyUrl({
  //   projectId,
  //   addresses: { connectedAddress: ["base", "avalanche"] },
  //   assets: ["USDC"],
  //   presetFiatAmount: 5,
  //   fiatCurrency: "USD",
  // });

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const defaultProfilePicture = "/guest-profile.jpg";

  const profilePicture = profileInfo && profileInfo[2] ? profileInfo[2] : defaultProfilePicture;

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary
          tabIndex={0}
          className="btn btn-secondary bg-base-200 btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundImage: `url(${profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <span className="ml-2 mr-1">
            {profileInfo && profileInfo[0] != ""
              ? profileInfo[0]
              : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          {/* <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" /> */}
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <div className="flex lg:hidden justify-center">
            <PunkBalance address={connectedAddress} />
          </div>
          <li className={selectingNetwork ? "hidden" : ""}>
            <Link className="p-0 flex items-center justify-center" href={`/profile/${connectedAddress}`} passHref>
              <div className="btn-sm w-full !rounded-xl flex items-center justify-start gap-2 py-3 text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-500">
                <UserIcon className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0" aria-hidden="true" />
                {/* <Link href={blockExplorerAddressLink} rel="noopener noreferrer" className="whitespace-nowrap"> */}
                <Link href={`/profile/${connectedAddress}`} passHref>
                  Go to Profile
                </Link>
              </div>
            </Link>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">Receive funds</span>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="send-usdc-modal" className=" btn-sm !rounded-xl flex gap-3 py-3">
              <ArrowUpLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">Send funds</span>
            </label>
          </li>
          {/* <li className={selectingNetwork ? "hidden" : ""}>
            <label
              htmlFor="bridge-usdc-modal"
              className="bg-[#4338CA] text-white hover:bg-[#4f46e5] active:bg-[#4f46e5] btn-sm !rounded-xl flex gap-3 py-3"
            >
              <LinkIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">Bridge USDC</span>
            </label>
          </li>
          <li className={selectingNetwork ? "hidden" : ""}>
            <FundButton
              text="Buy USDC"
              fundingUrl={onrampBuyUrl}
              className="py-1 text-white px-6 md:px-3.5 gap-0.5 md:gap-1 text-md rounded-xl bg-[#4338CA] hover:bg-[#4f46e5] active:bg-[#4f46e5] justify-start font-normal "
            />
          </li> */}

          <li className={selectingNetwork ? "hidden" : ""}>
            <button
              className="menu-item text-red-600 dark:text-red-500 btn-sm !rounded-xl flex gap-3 py-3"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details>
    </>
  );
};
