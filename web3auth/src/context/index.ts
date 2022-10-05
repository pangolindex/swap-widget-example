import { Web3Provider } from "@ethersproject/providers";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext } from "react";

export const Web3AuthContext = createContext<Web3Auth | null>(null);

interface Web3State {
    library: Web3Provider | undefined;
    account: string | undefined | null;
    chainId: number | undefined;
  }
  

export const Web3Context= createContext<Web3State>({} as Web3State)
