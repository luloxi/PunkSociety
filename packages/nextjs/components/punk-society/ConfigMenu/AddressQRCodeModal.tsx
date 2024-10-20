import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Address as AddressType } from "viem";
import { notification } from "~~/utils/scaffold-eth";

type AddressQRCodeModalProps = {
  address: AddressType;
  modalId: string;
};

export const AddressQRCodeModal = ({ address, modalId }: AddressQRCodeModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    notification.success("Address copied to clipboard");
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4">Your Address</h2>
              <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <QRCodeSVG value={address} size={256} />
              </div>
              <div className="break-words whitespace-pre-wrap text-center w-full">{address}</div>
              <CopyToClipboard text={address} onCopy={handleCopy}>
                <button className="btn btn-primary bg-green-600 hover:bg-green-500 active:bg-green-500 mt-4">
                  {copied ? "Copied!" : "Copy Address"}
                </button>
              </CopyToClipboard>
              <label
                htmlFor={`${modalId}`}
                className="btn text-xl rounded-full text-white bg-red-600 hover:bg-red-500 btn-ghost btn-sm btn-circle absolute right-3 top-3"
              >
                ✕
              </label>
            </div>
          </label>
        </label>
      </div>
    </>
  );
};
