const Config = require("./config");
const { ethers, hardhatArguments } = require("hardhat");
const path = require("path");
const fs = require("fs-extra");

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();

  // // CHIEN Deploy
  // console.log("deploy from address: ", deployer.address);
  // const chien = await ethers.deployContract("CHIEN");
  // const chienAddress = await chien.getAddress();
  // console.log("CHIEN address:", chienAddress);
  // Config.setConfig(network + ".CHIEN", chienAddress);

  // Faucet Deploy
  console.log("deploy from address: ", deployer.address);
  const Faucet = await ethers.deployContract("Faucet", [
    "0xE0A1F73936Fc63573Af0A47386CA1544530abFB5",
  ]);
  const FaucetAddress = await Faucet.getAddress();
  console.log("Faucet address:", FaucetAddress);
  Config.setConfig(network + ".Faucet", FaucetAddress);

  // // Donate Deploy
  // console.log("deploy from address: ", deployer.address);
  // const Donate = await ethers.deployContract("Donate", [
  //   "0xA80A0E9e7561f72cF4B44F567fe8C4457290f781",
  // ]);
  // const DonateAddress = await Donate.getAddress();
  // console.log("Donate address:", DonateAddress);
  // Config.setConfig(network + ".Donate", DonateAddress);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
