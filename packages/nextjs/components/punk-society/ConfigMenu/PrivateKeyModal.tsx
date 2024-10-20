import { useEffect, useState } from "react";
import { notification } from "~~/utils/scaffold-eth";

type AddressQRCodeModalProps = {
  modalId: string;
};

export const PrivateKeyModal = ({ modalId }: AddressQRCodeModalProps) => {
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  useEffect(() => {
    const storedPrivateKey = localStorage.getItem("burnerWallet.pk");
    setPrivateKey(storedPrivateKey);
  }, []);

  const handleCopy = () => {
    if (privateKey) {
      navigator.clipboard
        .writeText(privateKey)
        .then(() => {
          notification.success("Private key copied to clipboard");
          // alert("Private key copied to clipboard");
        })
        .catch(err => {
          notification.error("Failed to copy private key: ", err);
        });
    }
  };

  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4">Your Private Key</h2>
              <div className="break-words whitespace-pre-wrap text-red-600 font-bold text-center w-full">
                Save this into a safe place and don&apos;t share it with anyone.
              </div>
              <div className="break-words whitespace-pre-wrap text-red-600 font-bold mt-4 text-center w-full">
                This is the only way to recover your account and funds, and it can&apos;t be changed or retrieved by
                PunkSociety team.
              </div>
              <div className="break-words whitespace-pre-wrap mt-4 text-left w-full">{privateKey}</div>
              <button
                onClick={handleCopy}
                className="btn btn-primary bg-green-600 hover:bg-green-500 active:bg-green-500 mt-4"
              >
                Copy Private Key
              </button>
            </div>
            <label
              htmlFor={`${modalId}`}
              className="btn text-xl rounded-full bg-red-600 hover:bg-red-500 btn-ghost btn-sm btn-circle absolute right-3 top-3"
            >
              ✕
            </label>
          </label>
        </label>
      </div>
    </>
  );
};
