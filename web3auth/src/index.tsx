import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { PangolinProvider } from '@pangolindex/components';
import getProvider, { Web3AuthContext } from './utils';
import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';

const clientId = 'BLrQdLh3MGddgfl3dq0kMJ8q62CsFUkBY05h1npiHyUA_MfAWix8FaW4xlC08o--wfygSoj98PRw_vWA3x1WEjg'; // get from https://dashboard.web3auth.io

const chainId = 43114;

const AppProvider = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>();
  const [web3authProvider, setWeb3authProvider] = useState();
  const [etherProvider, setProvider] = useState<Web3Provider | null>();
  const [address, setAddress] = useState<string | null | undefined>();

  useEffect(() => {
    const init = async () => {
      try {
        const _web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: `0x${chainId.toString(16)}`,
            rpcTarget: 'https://api.avax-test.network/ext/bc/C/rpc',
          },
        });

        const metamaskAdapter = new MetamaskAdapter({
          clientId: clientId,
        });

        _web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(_web3auth);

        await _web3auth.initModal();

        if (_web3auth.provider) {
          const _provider = getProvider(_web3auth.provider);
          const signer = _provider.getSigner();
          const _address = await signer.getAddress();
          setProvider(_provider);
          setAddress(_address);
          setWeb3authProvider(_web3auth.provider as any)
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (!etherProvider) return;
      const signer = etherProvider.getSigner();

      const _address = await signer.getAddress();
      setAddress(_address);
    };
    getAddress();
  }, [etherProvider]);

  // web3, eip-1193
  // ethers

  return (
    <Web3AuthContext.Provider value={web3auth}>
      <PangolinProvider library={web3authProvider} chainId={chainId} account={address}>
        <App onProviderChange={(provider: any) => setProvider(provider)} provider={etherProvider} account={address} />
      </PangolinProvider>
    </Web3AuthContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <AppProvider />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
