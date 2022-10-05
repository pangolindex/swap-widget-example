import { Button, SwapWidget } from '@pangolindex/components';
import React, { useContext } from 'react';
import './App.css';
import { Web3AuthContext, Web3Context } from './context';
import getLibrary from './utils/getLibrary';

function App({ handleProvider }: { handleProvider: (provider: any) => void }) {
  const web3auth = useContext(Web3AuthContext);

  const { library: provider, account } = useContext(Web3Context);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    const _provider = getLibrary(web3authProvider);
    handleProvider(_provider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    handleProvider(undefined);
  };

  return (
    <div className="App">
      <Button variant="primary" isDisabled={!!provider} onClick={login} width="400px">
        {!provider ? 'Connect Wallet' : account}
      </Button>
      {!!provider && (
        <Button variant="primary" onClick={logout} width="400px"> Logout</Button>
      )}
      <div style={{  maxWidth: '400px' }}>
        <SwapWidget />
      </div>
    </div>
  );
}

export default App;
