import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import type {
  SwapWidget as SwapWidgetType,
  Button as ButtonType,
  PangolinProvider as PangolinProviderType,
} from '@pangolindex/components';

const Button = dynamic(() => import('@pangolindex/components').then((module) => module.Button) as any, {
  ssr: false,
}) as typeof ButtonType;

const PangolinProvider = dynamic(
  () => import('@pangolindex/components').then((module) => module.PangolinProvider) as any,
  { ssr: false },
) as typeof PangolinProviderType;

const SwapWidget = dynamic(() => import('@pangolindex/components').then((module) => module.SwapWidget) as any, {
  ssr: false,
}) as typeof SwapWidgetType;

const Home: NextPage = () => {
  const [web3Modal, setWeb3Modal] = useState(undefined as Web3Modal | undefined);

  useEffect(() => {
    let web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
            name: 'Injected',
            description: 'Connect with the provider in your Browser',
          },
          package: null,
        },
      },
    });

    setWeb3Modal(web3Modal);
  }, []);

  const [web3jsProvider, setWeb3jsProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState(43114);

  const connectWallet = async () => {
    try {
      const web3provider = await web3Modal?.connect();
      const ethersProvider = new ethers.providers.Web3Provider(web3provider);
      const accounts = await ethersProvider.listAccounts();
      const network = await ethersProvider.getNetwork();

      setWeb3jsProvider(web3provider);
      setChainId(network?.chainId);
      if (accounts) setAccount(accounts[0] as any);
      setChainId(network.chainId as any);
    } catch (error: any) {
      console.log(error);
    }
  };

  const refreshState = () => {
    setAccount(undefined);
    setChainId(43114);
  };

  const disconnect = async () => {
    await web3Modal?.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  if (!web3jsProvider) {
    return null;
  }

  return (
    <PangolinProvider account={account} chainId={chainId} library={web3jsProvider}>
      <div className="App">
        <Button
          variant="primary"
          onClick={() => {
            if (account) {
              disconnect();
            } else {
              connectWallet();
            }
          }}
          width="400px"
        >
          {account ? 'Disconnect' : 'Connect'} Wallet
        </Button>
        {account && <div className="wallet">{account}</div>}

        <div style={{ marginTop: '10px', maxWidth: 400 }}>
          <SwapWidget isLimitOrderVisible={false} />
        </div>
      </div>
    </PangolinProvider>
  );
};

export default Home;
