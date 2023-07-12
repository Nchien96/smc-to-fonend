import React, { useEffect, useState } from "react";
import { Web3 } from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import "../node_modules/bulma/css/bulma.min.css";

const Faucet = () => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  const [balance, setBalance] = useState();
  const web3 = new Web3(window.ethereum);
  const [shouldReaload, reload] = useState(false);
  const reloadEffect = () => {
    reload(!shouldReaload);
  };

  const faucetAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "form",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "withdraw",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "deposits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "locktime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "requesttoken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "setLocktime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "setWithdrawlAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraws",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withrawlAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
  const faucetAddress = "0xC89206F95185A0ad64A3c53f5f74922Ac7966a78";

  const donateAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "form",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "withdraw",
      type: "event",
    },
    {
      inputs: [],
      name: "donate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "donateAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "setDonateAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraws",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
  const donateAddress = "0xb10Adccda17eBF661c8a64C9dd5272E8db7B36B4";

  const chienAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const chienAddress = "0xE0A1F73936Fc63573Af0A47386CA1544530abFB5";

  const bsctestID = 97;

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };

    const switchNetwork = async (chainID) => {
      const currentChainID = await web3.eth.getChainId();
      console.log(currentChainID);
      if (currentChainID !== chainID) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(chainID),
              },
            ],
          });
        } catch (err) {
          console.log("chien");
          await addNetwork(bsctestNetwork);
        }
      }
    };

    const bsctestNetwork = {
      chainId: Web3.utils.toHex(bsctestID),
      chainName: "BNB Smart Chain Testnet",
      nativeCurrency: {
        name: "BSC TEST",
        symbol: "tBNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
      rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
    };

    const addNetwork = async (netWork) => {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [netWork],
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider();
      console.log(provider);
      await setHasProvider(provider);
      await switchNetwork(bsctestID);
      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        await refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
      }
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateWallet(accounts);
      console.log(accounts);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const loadBalance = async () => {
      const contract = await new web3.eth.Contract(donateAbi, donateAddress);
      const balance = await contract.methods.getBalance().call();
      await setBalance(web3.utils.fromWei(balance, "ether"));
    };
    loadBalance();
  }, [shouldReaload]);

  const faucet = async () => {
    try {
      const contract = await new web3.eth.Contract(faucetAbi, faucetAddress);
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const getBalance = await contract.methods
        .requesttoken()
        .send({ from: accounts[0] });

      console.log(getBalance);
    } catch (err) {
      console.error(err.message);
    }
  };

  const withdraw = async () => {
    try {
      const contract = await new web3.eth.Contract(donateAbi, donateAddress);
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await contract.methods.withdraws().send({ from: accounts[0] });
    } catch (err) {
      console.error(err.message);
    }
    reloadEffect();
  };

  const donate = async () => {
    try {
      const contract = await new web3.eth.Contract(donateAbi, donateAddress);
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await approve();
      await contract.methods.donate().send({ from: accounts[0] });
    } catch (err) {
      console.error(err.message);
    }
    reloadEffect();
  };

  const approve = async () => {
    try {
      const contract = await new web3.eth.Contract(chienAbi, chienAddress);
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await contract.methods
        .approve(donateAddress, 5)
        .send({ from: accounts[0] });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="faucet-wrapper">
      <div className="is-size-3">
        {hasProvider ? "" : "Please , Install Metamask"}
      </div>
      {hasProvider && (
        <div className="faucet">
          <div className="balance-view is-size-2 mb-2">
            Current Balance: <strong>{balance} Token</strong>
          </div>
          <button className="button is-primary mr-5" onClick={donate}>
            Donate
          </button>
          <button className="button is-danger mr-5" onClick={withdraw}>
            Withdraw
          </button>
          <button className="button is-link mr-5 " onClick={faucet}>
            Token Faucet
          </button>
          <button className="button is-warning " onClick={handleConnect}>
            ConnectMetamask
          </button>
          {wallet.accounts.length > 0 && (
            <div className="mt-5">Wallet Accounts: {wallet.accounts[0]}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Faucet;
