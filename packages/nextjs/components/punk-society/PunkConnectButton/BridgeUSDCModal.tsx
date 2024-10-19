import Image from "next/image";

type BridgeUSDCModalProps = {
  modalId: string;
};

export const BridgeUSDCModal = ({ modalId }: BridgeUSDCModalProps) => {
  const handleBridgeUSDCClick = () => {
    window.open("https://x.com/LuloxDev", "_blank");
  };
  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Sorry, we can&apos;t bridge USDC from Avalanche yet.
              </h2>

              <button
                onClick={handleBridgeUSDCClick}
                className="btn btn-primary border-0 flex items-center bg-black hover:bg-green-600 active:bg-green-600"
              >
                <Image
                  src="/lulox.jpg"
                  alt="Import your key in Core!"
                  width={40}
                  height={40}
                  className="mr-2 rounded-full"
                />
                Send me a DM and I&apos;ll get you started!
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
