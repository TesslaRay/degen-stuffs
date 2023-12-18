"use client";
import { useContractWrite } from "wagmi";
import WowowFaucetAbi from "../constants/wowowFaucetAbi.json";

const contractWowowFaucet = "0x78D66BE10A55ad59014e0770A91576A8E6702B68";

export default function CooldownButton({
  isConnected,
  address,
  setHoursUntilClaim,
  setTxError,
}: {
  isConnected: boolean;
  address: `0x${string}` | undefined;
  setHoursUntilClaim: (hours: number) => void;
  setTxError: (isError: boolean) => void;
}) {
  const { writeAsync, isLoading, isSuccess } = useContractWrite({
    address: contractWowowFaucet,
    abi: WowowFaucetAbi,
    functionName: "getCoolDown",
    chainId: 8453,
  });

  const handleClick = async (address: string) => {
    if (isConnected) {
      try {
        const txResponse = await writeAsync({
          args: [address],
        });
        if (isSuccess) {
          setHoursUntilClaim(Number(txResponse));
        }
      } catch (err) {
        setTxError(true);
      }
    }
  };

  return (
    <button
      className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 disabled:opacity-50 disabled:hover:bg-gray-400"
      onClick={() => handleClick(address!)}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Hours until next claim"}
    </button>
  );
}
