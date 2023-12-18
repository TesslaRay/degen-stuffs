"use client";
import { useContractWrite } from "wagmi";
import WowowFaucetAbi from "../constants/wowowFaucetAbi.json";
import { addHours } from "date-fns";
import { useEffect } from "react";

const contractWowowFaucet = "0x78D66BE10A55ad59014e0770A91576A8E6702B68";

export default function ContractButton({
  isConnected,
  setNewClaimDate,
  currentTime,
  setTokenBalance,
  tokenBalance,
  setTxError,
}: {
  isConnected: boolean;
  setNewClaimDate: (date: Date) => void;
  currentTime: Date;
  setTokenBalance: (balance: string) => void;
  tokenBalance: string;
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
      } catch (err) {
        setTxError(true);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const newClaimDate = addHours(currentTime, 24);
      setNewClaimDate(newClaimDate);
      setTokenBalance((Number(tokenBalance) + 13370).toString());
    }
  }, [isSuccess]);

  return (
    <button
      className="bg-[#40AF46] text-white font-bold py-2 px-4 rounded hover:bg-[#39993E] disabled:opacity-50 disabled:hover:bg-[#40AF46]"
      onClick={() => handleClick()}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Give me wowow"}
    </button>
  );
}
