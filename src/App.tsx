import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com/CyborgApesNFT">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.gg/UHVM4QyU2m">
                <img
                  className="nav-social discord"
                  src="/icons/discord.svg"
                  alt=""
                />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <div className="social-icons hide-800">
            <a href="https://twitter.com/CyborgApesNFT">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.gg/UHVM4QyU2m">
              <img
                className="nav-social discord"
                src="/icons/discord.svg"
                alt=""
              />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <img src="/ape.gif" className="ape-img" />

        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            {/* <h3 className="text-secondary-color">Welcome To</h3> */}
            <img src="/logo-bold.png" style={{ padding: "0 0 20px" }} />
            <h4 className="text-secondary-color">
              Cyborg Apes are an NFT collection consisting of 1111 unique
              algorithmically generated apes that are going to invade the Solana
              Blockchain. Their mission is to save normal apes from ruthless
              poachers.
            </h4>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>
      </div>
    </div>
  );
};

export default App;
