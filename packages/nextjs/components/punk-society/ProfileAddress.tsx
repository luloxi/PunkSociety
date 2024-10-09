"use client";

import Image from "next/image";
import Link from "next/link";
import { Address as AddressType, getAddress, isAddress } from "viem";
import { hardhat } from "viem/chains";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

type AddressProps = {
  address?: AddressType;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const ProfileAddress = ({ address, disableAddressLink, format, size = "base" }: AddressProps) => {
  const checkSumAddress = address ? getAddress(address) : undefined;

  const defaultProfilePicture = "/guest-profile.jpg";

  const { targetNetwork } = useTargetNetwork();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "profiles",
    args: [address],
    watch: true,
  });

  // Skeleton UI
  if (!checkSumAddress) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAddress(checkSumAddress)) {
    return <span className="text-error">Wrong address</span>;
  }

  let displayAddress = checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4);

  if (profileInfo && profileInfo[0] !== "") {
    displayAddress = profileInfo[0];
  } else if (format === "long") {
    displayAddress = checkSumAddress;
  }

  return (
    <div className="flex items-center flex-shrink-0">
      <div className="flex-shrink-0">
        {profileInfo && profileInfo[2] ? (
          <Image
            src={profileInfo[2]}
            alt="Profile Picture"
            width={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
            height={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
            className="rounded-full"
          />
        ) : (
          <Image
            src={defaultProfilePicture}
            alt="Profile Picture"
            width={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
            height={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
            className="rounded-full"
          />
        )}
      </div>
      {disableAddressLink ? (
        <span className={`ml-1.5 text-${size} font-normal`}>{displayAddress}</span>
      ) : targetNetwork.id === hardhat.id ? (
        <span className={`ml-1.5 text-${size} font-normal`}>
          <Link href={`/profile/${checkSumAddress}`} passHref>
            {displayAddress}
          </Link>
        </span>
      ) : (
        <div className={`ml-1.5 text-${size} font-normal`}>
          <Link href={`/profile/${checkSumAddress}`} passHref>
            {displayAddress}
          </Link>
        </div>
      )}
    </div>
  );
};
