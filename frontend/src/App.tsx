import React from "react";
import "./App.css";
import { DAppProvider, Kovan, Mainnet } from "@usedapp/core";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./styles/GlobalStyle";

const config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/ccc528634cd747c4965b25188a774e01",
    [Kovan.chainId]:
      "https://kovan.infura.io/v3/ccc528634cd747c4965b25188a774e01",
  },
};

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
