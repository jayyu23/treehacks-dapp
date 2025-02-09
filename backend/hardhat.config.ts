import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-viem";
require("dotenv").config();

/** @type {import('hardhat/config').HardhatUserConfig} */
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // // Uncomment this to use the sepolia network. Remember to use a .env file with the correct RPC URL and PRIVATE_KEY.
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // },
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    //   chainId: 31337
    // }
  }
};

export default config;