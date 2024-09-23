import { useEffect, useState } from "react";

export const Description = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("marketplaceDescriptionVisible");
    if (savedVisibility === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("marketplaceDescriptionVisible", "false");
  };

  if (!isVisible) return null;

  return (
    <div className="relative self-center md:w-full collapse bg-base-300">
      <input type="checkbox" className="collapse-checkbox" />
      <div className="collapse-title text-center text-xl font-medium pointer-events-auto">
        New to NFT Marketplaces? <strong className="text-green-500">Click here!</strong>
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
          <div className="flex flex-col">
            <p>
              NFTs, or Non-Fungible Tokens,{" "}
              <strong className="text-green-600">represent ownership of a piece of content or art</strong>.
              <br />
              Collectors can <strong className="text-green-600">mint or trade each piece</strong> of a NFT collection.
            </p>
            <p>
              NFTs allow artists to <strong className="text-green-600">earn royalties</strong> each time their work is
              resold.
              <br />
              This gives artists continuous <strong className="text-green-600">income beyond the first sale</strong>.
            </p>
          </div>

          <div className="flex flex-col">
            <p>
              Collectors can <strong className="text-green-600">mint</strong> or{" "}
              <strong className="text-red-600">trade</strong> each piece of a NFT collection.
              <br />
              Minting means <strong className="text-green-600">
                creating and owning a new piece of a collection
              </strong>{" "}
              which <strong className="text-red-600">is tradeable</strong>.
            </p>
            <p>
              You can choose <strong className="text-green-600">to mint an NFT of a collection</strong> (if still
              available)
              <br />
              <span>
                or <strong className="text-red-600">buy an NFT</strong> that was minted by someone else.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Close button - small circle with red X */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center z-10 pointer-events-auto"
        aria-label="Close"
      >
        X
      </button>
    </div>
  );
};
