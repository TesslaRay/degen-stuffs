"use client";
import { useContractWrite } from "wagmi";
import WowowFaucetAbi from "../constants/wowowFaucetAbi.json";

const contractWowowFaucet = "0x78D66BE10A55ad59014e0770A91576A8E6702B68";

export default function ContractButton({
  isConnected,
  setHoursUntilClaim,
  setTxError,
}: {
  isConnected: boolean;
  setHoursUntilClaim: (hours: number) => void;
  setTxError: (isError: boolean) => void;
}) {
  const { writeAsync, isLoading, isSuccess } = useContractWrite({
    address: contractWowowFaucet,
    abi: WowowFaucetAbi,
    functionName: "requestTokens",
    chainId: 8453,
  });

  const handleClick = async () => {
    if (isConnected) {
      try {
        await writeAsync();
        if (isSuccess) {
          setHoursUntilClaim(24);
        }
      } catch (err) {
        setTxError(true);
      }
    }
  };

  return (
    <button
      className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-800 disabled:opacity-50 disabled:hover:bg-purple-600"
      onClick={() => handleClick()}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Give me wowow"}
    </button>
  );
}
