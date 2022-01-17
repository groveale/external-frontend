import React from "react";
import "./App.css";
import { DAppProvider, Kovan, Mainnet } from "@usedapp/core";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./styles/GlobalStyle";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf',
    [Kovan.chainId]:
      'https://kovan.infura.io/v3/c0f4fcc6766542a0add0b57f3c631c97',
  },
}

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <DAppProvider config={config}>
        <MainPage />
      </DAppProvider>
    </div>
  );
}

export default App;
