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
              <a href="https://twitter.com/HeavensLotto">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.gg/sBT3R3wqsE">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
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
            <a href="https://twitter.com/HeavensLotto">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.gg/sBT3R3wqsE">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            {/* <h3 className="text-secondary-color">Welcome To</h3> */}
            <h1 className="pb-3">Heaven Sevens Lottery</h1>
            <h4 className="text-secondary-color">
              Solana's first daily lottery. The original ticket holders will 20%
              of royalties from each lottery pool.
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
        {/* 
        <div id="link2" className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit
          aliquet, semper sapien sed, ornare augue. Phasellus sed velit
          interdum, sagittis metus quis, facilisis lectus. Cras sollicitudin
          purus at magna eleifend maximus. Nulla nec nulla in nunc maximus
          viverra in at mauris. Fusce sodales dolor nisi, et vehicula orci porta
          id. In placerat nunc sed erat lacinia tincidunt. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Vestibulum commodo eget metus
          vitae tempus. Aliquam pharetra mi at efficitur accumsan. Curabitur
          venenatis libero a ex porttitor, at auctor turpis hendrerit. Nam
          commodo, risus non consequat pretium, erat ante auctor purus, a cursus
          dolor erat at velit. Maecenas dignissim, dolor sed laoreet aliquam,
          tortor lacus faucibus urna, eget mattis massa sem ac dui. Nam semper
          hendrerit interdum. Etiam at dictum nisi.
        </div> */}

        {/* <div id="link3" className="container card">
          <h1 className="pb-3">Lorem ipsum</h1>
        </div> */}
        {/* <img src="/img/balls.png" /> */}
        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
          <div>
            <h4>How is this lottery going to be run?</h4>
            <p>
              Everyday people can come in and buy multiple tickets for 0.1 SOL
              each. At the end of the day, we'll pick winning tickets and
              distribute prizes.
            </p>

            <hr />
          </div>

          <div>
            <h4>What are the prizes?</h4>
            <p>
              The jackpot is going to be 30% of the lottery pool collected, so
              for eg, if we sell 5000 tickets, you could potentially win 150
              SOL! We have smaller prizes too.
            </p>

            <hr />
          </div>

          <div>
            <h4>When will this lottery stop running?</h4>
            <p>
              When people stop buying tickets! Otherwise you're here, we're
              here, let's play the lotto.
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
