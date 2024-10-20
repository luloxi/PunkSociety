import Image from "next/image";

type AddressQRCodeModalProps = {
  modalId: string;
};

export const SwitchLanguageModal = ({ modalId }: AddressQRCodeModalProps) => {
  const handleLearnEnglishClick = () => {
    window.open("https://www.duolingo.com/", "_blank");
  };
  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold mb-4 text-red-600">Sorry, we don&apos;t have other languages yet.</h2>
              <button
                onClick={handleLearnEnglishClick}
                className="btn btn-primary border-0 flex items-center hover:bg-green-600 active:bg-green-600"
              >
                <Image src="/duolingo.gif" alt="Duolingo" width={60} height={60} className="mr-2" />
                Learn English in Duolingo!
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
