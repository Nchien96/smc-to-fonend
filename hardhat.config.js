require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
const path = require("path");
module.exports = {
  solidity: "0.8.18",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },

  paths: {
    artifacts: path.join(__dirname, "artifacts"),
  },

  networks: {
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.PRIV_KEY],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.API_KEY,
    },
  },
};
