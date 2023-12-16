"use client";

import { useEffect, useState } from "react";
import ConnectButton from "./components/ConnectButton";
import { useAccount, useContractRead } from "wagmi";
import WowowAbi from "./constants/wowow.json";
import { formatUnits } from "viem";

export default function Page() {
  const [targetAddress, setTargetAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const { isConnected, address } = useAccount();
  const { data, isSuccess, isLoading } = useContractRead({
    address: "0xB36A0e830bD92E7AA5D959c17A20D7656976dd98",
    abi: WowowAbi,
    functionName: "balanceOf",
    args: [address],
    chainId: 8453,
  });

  useEffect(() => {
    if (isConnected && isSuccess) {
      const balance = formatUnits(data as bigint, 18);
      setTokenBalance(balance);
    }
  }, [isConnected, isSuccess]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-6">
        <p className="text-lg font-bold">wowow FAUCET</p>
        <ConnectButton />
      </div>
      <div>
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
          <div className="text-3xl font-semibold mb-4 text-white">Balance</div>
          <div className="text-5xl font-semibold mb-6 text-white">
            {isLoading
              ? "..."
              : Math.floor(Number(tokenBalance)).toLocaleString()}
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 text-center min-w-[40%]">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Get your wowow!
            </h1>
            <input
              className="border mb-4"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600"
              disabled={!targetAddress.startsWith("0x")}
            >
              Get wowow tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
