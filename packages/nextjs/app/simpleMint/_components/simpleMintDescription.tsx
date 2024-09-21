import { useEffect, useState } from "react";

export const SimpleMintDescription = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("simpleMintDescriptionVisible");
    if (savedVisibility === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("simpleMintDescriptionVisible", "false");
  };

  if (!isVisible) return null;

  return (
    <div className="relative self-center md:w-full collapse bg-base-300">
      <input type="checkbox" className="collapse-checkbox" />
      <div className="collapse-title text-center text-xl font-medium pointer-events-auto">
        New to Simple Mint? <strong className="text-green-500">Click here!</strong>
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
          <div className="flex flex-col">
            <p>
              Simple Mint allows you to <strong className="text-green-600">upload your art and create an NFT</strong> on
              a blockchain.
              <br />
              NFTs, or Non-Fungible Tokens,{" "}
              <strong className="text-green-600">represent ownership of a piece of content or art</strong>.
            </p>
            <p>
              Collectors can <strong className="text-green-600">mint or trade each piece</strong> of a NFT collection.
              <br />
              Minting means <strong className="text-green-600">creating a new NFT or NFT collection</strong> and adding
              it to the blochchain.
            </p>
            <p>
              By minting an NFT of an artist collection,{" "}
              <strong className="text-green-600">you ensure it is part of a limited collection</strong>.
              <br />
              This adds value and provides collectors with proof of authenticity.
            </p>
          </div>

          <div className="flex flex-col">
            <p>
              NFTs allow artists to <strong className="text-green-600">earn royalties</strong> each time their work is
              resold.
              <br />
              This gives artists continuous <strong className="text-green-600">income beyond the first sale</strong>.
            </p>
            <p>
              If you choose <strong className="text-yellow-600">gasless minting</strong>, you can start an NFT
              collection <strong className="text-yellow-600">without needing to pay</strong>
              <br />
              <span>
                {" "}
                You upload your NFT info and{" "}
                <strong className="text-yellow-600">sign a message to prove you own it</strong>.
              </span>
            </p>
            <p>
              When someone first mints it, they pay the{" "}
              <strong className="text-yellow-600">NFT price plus the collection minting costs.</strong>
              <br />
              First minters <strong className="text-yellow-600">get a share of the royalties</strong> of all the NFTs
              minted in that collection.
            </p>
          </div>
        </div>
      </div>

      {/* Close button */}
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
