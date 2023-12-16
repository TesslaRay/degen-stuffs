"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { base } from "viem/chains";

const projectId = "6587b2f7788cac5b831cb5707757e769";

const metadata = {
  name: "wowow Faucet",
  description: "A faucet for wowow",
  url: "https://zurf.social/",
  icons: ["https://zurf.social/assets/mobile-icon.png"],
};

const chains = [base];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: any) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
