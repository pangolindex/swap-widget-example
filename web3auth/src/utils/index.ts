import { Web3Provider } from '@ethersproject/providers'
import { Web3Auth } from '@web3auth/web3auth';
import { createContext } from 'react';

export default function getProvider(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

export const Web3AuthContext = createContext<Web3Auth | null>(null);
