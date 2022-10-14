import { Button, SwapWidget } from '@pangolindex/components';
import React, { useContext } from 'react';
import './App.css';
import getProvider, { Web3AuthContext } from './utils';

type Props = { onProviderChange: (provider: any) => void; provider: any; account: string };

function App(props: Props) {
  const { onProviderChange, provider, account } = props;
  const web3auth = useContext(Web3AuthContext);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    const _provider = getProvider(web3authProvider);
    onProviderChange(_provider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    onProviderChange(undefined);
  };

  return (
    <div className="App">
      <Button variant="primary" isDisabled={!!provider} onClick={login} width="400px">
        {!provider ? 'Connect Wallet' : account}
      </Button>
      {!!provider && (
        <Button variant="primary" onClick={logout} width="400px">
          Logout
        </Button>
      )}
      <div style={{ maxWidth: '400px' }}>
        <SwapWidget />
      </div>
    </div>
  );
}

export default App;
