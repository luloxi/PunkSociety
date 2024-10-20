import { useState } from "react";
import { PunkBalance } from "../PunkBalance";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

type SendUSDCModalProps = {
  modalId: string;
};

export const SendUSDCModal = ({ modalId }: SendUSDCModalProps) => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("SimpleFaucet");

  const handleTransfer = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      const contractResponse = await writeContractAsync({
        functionName: "transfer",
        args: [receiver],
        value: BigInt(amount),
      });

      if (contractResponse) {
        notification.success("Transfered successfully!");
      }
    } catch (error) {
      console.error("Error during transfering:", error);
      notification.error("Transfering failed, please try again.");
    } finally {
    }
  };

  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col justify-center items-center text-center gap-3">
              <h2 className="text-xl">Transfer USDC to other address</h2>

              <InputBase value={receiver} onChange={setReceiver} placeholder="Enter receiver" />
              <div className="flex flex-row justify-between items-center">
                <PunkBalance address={connectedAddress} />
                <InputBase value={amount} onChange={setAmount} placeholder="Enter amount" />
              </div>
              <button
                className="btn btn-primary text-white bg-[#2E79CC] hover:bg-blue-700 active:bg-blue-700  border-0"
                onClick={handleTransfer}
              >
                Transfer
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
