import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [isConnectedd, setIsConnectedd] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [signer, setSigner] = useState("");
  const [Network, setNetwork] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [dopen, setdopen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  async function connectToMetaMask() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const web3 = provider;
        setSigner(provider.getSigner());
        setWeb3(web3);
        const metaMaskAccount = await provider.send("eth_requestAccounts", []);
        setIsConnectedd(true);
        let splitedMetaMaskAddress;
        if (metaMaskAccount) {
          splitedMetaMaskAddress =
            metaMaskAccount[0].substring(0, 6) +
            "......" +
            metaMaskAccount[0].substring(
              metaMaskAccount[0].length - 4,
              metaMaskAccount[0].length
            );
        }
        setConnectedAddress(metaMaskAccount[0]);
        web3.getNetwork().then((result) => {
          const myObject = result; // Store the resolved object in a const variable
          setNetwork(myObject); // You can now work with myObject
        });
      } else if (window.web3) {
        window.web3 = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        setIsOpen(!isOpen);
        // window.alert(
        //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
        // );
      }
    } catch {}
  }

  useEffect(() => {
    if (isConnectedd === true) {
      console.log(isConnectedd);
      console.log("Already connected to MetaMask11");
    }
    // connectToMetaMask();
  }, [isConnectedd]);

  useEffect(() => {
    registerEvents();
    console.log("registered events called");
  }, []);
  function registerEvents() {
    try {
      window.ethereum.on("accountsChanged", (a) => {
        setConnectedAddress(a[0]);
      });

      window.ethereum.on("chainChanged", (c) => {
        setChainId(c);
      });

      window.ethereum.on("disconnect", (c) => {
        console.log("MetaMask discconnected", c);
        setIsConnectedd(false);
      });
    } catch {}
  }

  return (
    <>
      <Web3Context.Provider
        value={{
          web3,
          isConnectedd,
          connectedAddress,
          connectToMetaMask,
          signer,
          Network,
          isOpen,
          dopen,
          setdopen,
        }}
      >
        {children}
      </Web3Context.Provider>
    </>
  );
};
