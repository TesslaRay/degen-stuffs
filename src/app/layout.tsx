import { Web3Modal } from "./Web3Modal";
import "./globals.css";

export const metadata = {
  title: "wowow Faucet",
  description: "wowow Faucet",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
