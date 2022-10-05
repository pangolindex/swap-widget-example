import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { PangolinProvider } from '@pangolindex/components';
import getLibrary from './utils/getLibrary';
import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3AuthContext, Web3Context } from './context';

const clientId = 'BLrQdLh3MGddgfl3dq0kMJ8q62CsFUkBY05h1npiHyUA_MfAWix8FaW4xlC08o--wfygSoj98PRw_vWA3x1WEjg'; // get from https://dashboard.web3auth.io

const chainId = 43113;

const AppProvider = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  //const [safeProvider, setSafeProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [provider, setProvider] = useState<Web3Provider | null>(null);
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
          const _provider = getLibrary(_web3auth.provider);
          setProvider(_provider);
          
          const signer = _provider.getSigner();

          const _address = await signer.getAddress();
          setAddress(_address);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (!provider) return;
      const signer = provider.getSigner();

      const _address = await signer.getAddress();
      setAddress(_address);
    };
    getAddress();
  }, [provider]);

  return (
    <Web3AuthContext.Provider value={web3auth}>
      <Web3Context.Provider
        value={{
          library: provider,
          account: address,
          chainId: chainId,
        }}
      >
        <PangolinProvider library={provider} chainId={chainId} account={address}>
          <App handleProvider={(provider: any) => setProvider(provider)} />
        </PangolinProvider>
      </Web3Context.Provider>
    </Web3AuthContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
