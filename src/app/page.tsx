"use client";
import { useEffect, useState } from "react";
import ConnectButton from "./components/ConnectButton";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import WowowAbi from "./constants/wowowAbi.json";
import { formatUnits } from "viem";
import { base } from "viem/chains";
import ContractButton from "./components/ContractButton";

export default function Page() {
  const [targetAddress, setTargetAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState("...");
  const { isConnected, address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { data, isSuccess } = useContractRead({
    address: "0xB36A0e830bD92E7AA5D959c17A20D7656976dd98",
    abi: WowowAbi,
    functionName: "balanceOf",
    args: [address],
    chainId: 8453,
  });

  useEffect(() => {
    if (isConnected && isSuccess) {
      const balance = formatUnits(data as bigint, 18);
      setTokenBalance(Math.floor(Number(balance)).toLocaleString());
    }
  }, [isConnected, isSuccess, data]);

  useEffect(() => {
    if (switchNetwork && isConnected && chain?.id !== base.id) {
      switchNetwork(base.id);
    }
  }, [switchNetwork, isConnected, chain?.id, base.id]);

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-lg font-bold text-white">wowow Faucet</h1>
        <ConnectButton />
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col min-h-full items-center justify-around bg-gradient-to-r from-purple-400 to-blue-500">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Balance</h2>
            <h2 className="text-5xl font-semibold mb-8 text-white">
              {isConnected ? tokenBalance : "..."}
            </h2>
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 text-center min-w-[40%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get your wowow!
            </h2>
            <input
              className="border mb-4"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
            />
            <ContractButton
              targetAddress={targetAddress}
              isConnected={isConnected}
            />
          </div>
          <h3 className="font-extralight">
            built by a bunch of degens from the{" "}
            <a href="https://zurf.social/" className="font-bold">
              zurf
            </a>{" "}
            team
          </h3>
        </div>
      </div>
    </div>
  );
}
