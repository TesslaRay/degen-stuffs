'use client'

import { useAccount, useContractWrite } from "wagmi";
import { wowAbi } from "../utils/wowowAbi";


export default function ContractButton() {
  const { address, isConnected } = useAccount();
  const contractWowow = '0x0C1eAAef7D91Bf9D50D0C850D46e6e12a821526F';

  const { write, data, isLoading, isError } = useContractWrite({
    address: contractWowow,
    abi: wowAbi,
    functionName: 'requestTokens',
    args: [address]
    // No proporcionamos args aquí para evitar el uso de un valor indefinido
  });

  const handleClick = () => {
    console.log('Handle click')
    if (isConnected && address) {
      // Solo pasamos args cuando estamos seguros de que la dirección está definida
      write();
    }
  };

  return (
    <button 
      className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
      onClick={handleClick}
    //   disabled={!isConnected || isLoading}
    >
      {isLoading ? 'Processing...' : 'Get Wowow tokens'}
    </button>
  );
}
