import { useState } from "react";
import { InputBase } from "~~/components/scaffold-eth";

type LoadPrivateKeyModalProps = {
  modalId: string;
};

export const LoadPrivateKeyModal = ({ modalId }: LoadPrivateKeyModalProps) => {
  const [privateKey, setPrivateKey] = useState("");

  const handleLoadPrivateKeyClick = () => {
    localStorage.setItem("burnerWallet.pk", privateKey);
    window.location.reload();
  };
  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col justify-center items-center gap-3 text-center">
              <h2 className="text-xl font-bold  text-green-600 text-wrap">
                Enter your private key to load your account
              </h2>
              <InputBase value={privateKey} onChange={setPrivateKey} placeholder="Enter your private key" />
              <button onClick={handleLoadPrivateKeyClick} className="btn btn-success border-0 flex items-center ">
                Load account!
              </button>
              <label
                htmlFor={`${modalId}`}
                className="btn text-xl rounded-full bg-red-600 hover:bg-red-500 btn-ghost btn-sm btn-circle absolute right-3 top-3"
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
