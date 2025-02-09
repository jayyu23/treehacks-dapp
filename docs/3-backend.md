# Backend Smart Contract Stack

## Overview

The backend of our DApp consists of smart contracts written in Solidity and a development environment to compile, test, and deploy them. The main components are:

- **Hardhat** - Development environment and testing framework
- **OpenZeppelin** - Smart contract libraries and standards
- **Viem** - Ethereum utilities for deployment and testing
- **Infura/Alchemy** - RPC providers for testnet/mainnet deployment


## Solidity and Smart Contracts

Solidity is a statically-typed programming language designed for implementing smart contracts on various blockchain platforms, primarily Ethereum. Smart contracts are programs that run on the Ethereum Virtual Machine (EVM) and automatically execute when predetermined conditions are met. Solidity has similar syntax to a low-level systems language like C++.

Key characteristics of Solidity and the EVM:

- **Smart Contracts**: Self-executing contracts with the terms directly written into code
- **Immutable**: Once deployed, contract code cannot be changed
- **Deterministic**: Same input always produces same output
- **Gas-based**: Operations cost "gas" which translates to ETH
- **State Management**: Contracts can store state on the blockchain

The EVM (Ethereum Virtual Machine) is not limited to just Ethereum. Many other blockchains are EVM-compatible, meaning they can run Solidity smart contracts, including:

- Ethereum (and testnets like Sepolia)
- Polygon
- Arbitrum
- Optimism
- BNB Chain
- Avalanche
- Base
- And many others

This means that smart contracts written in Solidity can be deployed to any of these networks with minimal changes. An example of a smart contract is the `SimpleNFT` contract in the `contracts/simple-nft-sale.sol` file.

This is a simple NFT contract that allows users to mint NFTs for a fixed price. It uses the ERC721 standard for NFTs, implementing the OpenZeppelin ERC721 library.

## Hardhat

Hardhat is a development environment specifically designed for Ethereum smart contract development. It provides:

- Local blockchain network for testing
- Built-in testing framework
- Contract compilation and deployment tools
- Console debugging
- Network management for different environments (local, testnet, mainnet)

We've already created a Hardhat project for you in the `backend` directory. To start a new Hardhat project:
```bash
npm init -y
npx hardhat init
```

This will create a new Hardhat project with a basic configuration. Remember to choose the Typescript-Viem template to ensure compatibility with the frontend.


The typical Hardhat project structure looks like this:
```
backend/
├── contracts/ # Smart contracts
│ ├── SimpleNFT.sol # Example contract
│ └── ...
├── scripts/ # Deployment scripts
│ ├── deploy.ts # Example deployment script
│ └── ...
├── test/ # Testing
│ ├── SimpleNFT.ts # Example test
│ └── ...
└── hardhat.config.ts # Hardhat configuration
```

To compile your contracts with Hardhat:
```bash
npx hardhat compile
```


## Testing

Smart contract testing is crucial because once deployed, contracts cannot be modified. Hardhat provides a robust testing framework that allows you to:

1. Write tests in TypeScript/JavaScript using familiar testing frameworks like Mocha and Chai
2. Simulate blockchain transactions and state changes
3. Test contract interactions from different accounts
4. Manipulate blockchain parameters (time, blocks, etc.)

Example of tests in the `test/SimpleNFT.ts` file:

```ts
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { simpleNFT, owner } = await loadFixture(deploySimpleNFTFixture);
      // Use getAddress to normalize the case
      expect(await simpleNFT.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    it("Should have correct initial values", async function () {
      const { simpleNFT } = await loadFixture(deploySimpleNFTFixture);
      expect(await simpleNFT.read.MINT_PRICE()).to.equal(parseEther("0.01"));
      expect(await simpleNFT.read.MAX_SUPPLY()).to.equal(100n);
    });
  });
```

To run the tests:
```bash
npx hardhat test
```

Now that we know how to compile, test and deploy our contracts, we can move on to deploying our contracts to both the Hardhat local network and to the public Ethereum Sepolia testnet in Part 4: [Deploying Contracts](4-deploying-contracts.md).