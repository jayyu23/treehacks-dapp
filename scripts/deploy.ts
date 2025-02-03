/**
 * This script is used to deploy the SimpleNFT contract to the Sepolia testnet.
 * It uses the viem library to deploy the contract. For each smart contract that you want to deploy, can modify this script.
 */
import { viem } from "hardhat";

async function main() {
  console.log("Deploying SimpleNFT contract...");
  
  const simpleNFT = await viem.deployContract("SimpleNFT");

  console.log("SimpleNFT deployed to:", simpleNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 