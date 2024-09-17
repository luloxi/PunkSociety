export const SimpleMintDescription = () => {
  return (
    <div className="self-center w-1/2 collapse bg-base-300">
      <input type="checkbox" />
      <div className="collapse-title text-center text-xl font-medium ">
        ↓↓ New to Simple Mint? <strong className="text-green-500">Click here!</strong> ↓↓
      </div>
      <div className="collapse-content">
        <p className="text-center">
          Simple Mint allows you to upload your art <strong className="text-green-500">without needing to pay</strong>.
          <br />
          <span className="py-2">
            {" "}
            Instead, you upload it and sign a message to <strong className="text-green-500">prove you own it</strong>.
          </span>
          <br />
          <br />
          When someone decides to first buy it, they pay for the price{" "}
          <strong className="text-green-500">plus the minting costs.</strong>
          <br />
          First minters <strong className="text-green-500">get a share of the royalties</strong> of all the NFTs minted
          in that collection.
        </p>
      </div>
    </div>
  );
};
