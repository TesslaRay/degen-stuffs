"use client";

import { useContractWrite } from "wagmi";
import wowowFaucetAbi from "../constants/wowowFaucetAbi.json";

export default function ContractButton({
  targetAddress,
  isConnected,
}: {
  targetAddress: string;
  isConnected: boolean;
}) {
  const contractWowow = "0x0C1eAAef7D91Bf9D50D0C850D46e6e12a821526F";

  const { write, isLoading } = useContractWrite({
    address: contractWowow,
    abi: wowowFaucetAbi,
    functionName: "requestTokens",
  });

  const handleClick = (address: string) => {
    if (isConnected) {
      write({
        args: [address],
      });
    }
  };

  return (
    <button
      className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600"
      onClick={() => handleClick(targetAddress)}
      disabled={!targetAddress.startsWith("0x")}
    >
      {isLoading ? "Processing..." : "Get Wowow tokens"}
    </button>
  );
}
