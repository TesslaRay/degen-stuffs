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
import CooldownButton from "./components/CooldownButton";
import { isEqual, differenceInHours } from "date-fns";

const contractWowow = "0xB36A0e830bD92E7AA5D959c17A20D7656976dd98";

export default function Page() {
  const initialDateState = new Date(0);
  const [tokenBalance, setTokenBalance] = useState("...");
  const [newClaimDate, setNewClaimDate] = useState(initialDateState);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [txError, setTxError] = useState(false);
  const { isConnected, address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { data: balanceData, isSuccess: balanceSuccess } = useContractRead({
    address: contractWowow,
    abi: WowowAbi,
    functionName: "balanceOf",
    args: [address],
    chainId: 8453,
  });

  useEffect(() => {
    if (isConnected && balanceSuccess) {
      const balance = formatUnits(balanceData as bigint, 18);
      setTokenBalance(Math.floor(Number(balance)).toLocaleString());
    }
  }, [isConnected, balanceSuccess, balanceData]);

  useEffect(() => {
    if (switchNetwork && isConnected && chain?.id !== base.id) {
      switchNetwork(base.id);
    }
  }, [switchNetwork, isConnected, chain?.id, base.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#17101F]">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-lg font-bold text-white">wowow Faucet</h1>
        <ConnectButton />
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col min-h-full items-center justify-around bg-[#17101F]">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Balance</h2>
            <h2 className="text-5xl font-semibold mb-8 text-white">
              {isConnected ? tokenBalance : "..."}
            </h2>
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 text-center min-w-[40%] gap-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {txError
                ? "Something went wrong"
                : isEqual(newClaimDate, initialDateState)
                ? "Get your wowow!"
                : `Come back in ${differenceInHours(
                    newClaimDate,
                    currentTime
                  )} hours`}
            </h2>
            <ContractButton
              isConnected={isConnected}
              setNewClaimDate={setNewClaimDate}
              currentTime={currentTime}
              setTokenBalance={setTokenBalance}
              tokenBalance={tokenBalance}
              setTxError={setTxError}
            />
            <CooldownButton
              isConnected={isConnected}
              address={address}
              setNewClaimDate={setNewClaimDate}
              currentTime={currentTime}
              setTxError={setTxError}
            />
          </div>
          <h3 className="font-extralight text-white">
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
