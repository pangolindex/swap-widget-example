import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./state";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { PangolinProvider } from "@pangolindex/components";
import getLibrary from "./utils/getLibrary";

const AppProvider = () => {
  const { library, account, chainId } = useWeb3React<Web3Provider>();

  return (
    <PangolinProvider
      library={library}
      chainId={chainId}
      account={account as string}
    >
      <App />
    </PangolinProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AppProvider />
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
