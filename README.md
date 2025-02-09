# TreeHouse SDK

By Jay Yu and Josh Koo

A framework for one-click deployment of Web3 applications on Ethereum. Built for the TreeHacks Web3 Workshop.

## Project Overview

![DApp Overview](./docs/img/mint.png)

The DApp SDK consists of two main components:
- A frontend application for ETH transfers and NFT minting, built with Next.js, Wagmi, and RainbowKit to interact with the smart contracts
- Backend smart contracts using Hardhat, including a basic ERC721 NFT deployer contract, and the default Hardhat Lock contract


## Quick Start

### Prerequisites
- Node.js 18+ installed (Suggested `nvm use 20`)
- MetaMask or another Web3 wallet with Sepolia testnet access where you have access to a private key
- Some Sepolia testnet ETH from a faucet, such as Google Cloud's [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)


1. Clone this repository
```bash
git clone https://github.com/Stanford-Blockchain-Club/treehouse-sdk
```

2. Install dependencies in both backend and frontend directories:
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Run the frontend on `localhost:3000`:
```bash
npm run dev
```

### Features

The deployed application (accessible at `localhost:3000`) has several basic features of a web3 application:
1. Wallet connection using RainbowKit, that automatically connects to the Ethereum Sepolia testnet (supporting MetaMask, Coinbase etc.)
2. ETH transfer functionality on Ethereum's Sepolia testnet by entering an address and amount. This will ask the user to confirm a simple transaction in their wallet.
3. NFT minting capability, interacting with a Sepolia-deployed ERC721 contract (`simple-nft-sale.sol`). This NFT contract clones Azuki's metadata format, and is viewable on Opensea.

Surprisingly, even for such a seemingly trivial web3 application, you need a whole lot of infrastructure to get it working, including:
- Next.js frontend
- Wagmi to interact with the Ethereum blockchain
- RainbowKit to connect wallets
- Hardhat to deploy and test smart contracts
- Sepolia testnet RPC URL from Infura or Alchemy to connect to the Ethereum network
- Sepolia ETH to pay for gas fees

## How does it work?

See documentation and guides in the `docs` folder:
- Part 1: [Anatomy of an Ethereum DApp](docs/1-intro.md)
- Part 2: [Frontend TypeScript Stack](docs/2-frontend.md)
- Part 3: [Backend Smart Contract Stack](docs/3-backend.md)
- Part 4: [Deploying Smart Contracts (Local and Sepolia Testnet)](docs/4-testnet.md)


## Project Structure
```
treehacks-dapp/
├── backend/ # Smart contract & deployment code
| |
│ ├── contracts/ # Solidity smart contracts
│ │ ├── Lock.sol # Basic lock contract
│ │ └── SimpleNFTSale.sol # NFT contract
│ ├── scripts/ # Contract deployment scripts
│ ├── test/ # Contract test files
│ ├── ignition/ # Hardhat Ignition deployment modules
│ ├── hardhat.config.ts # Hardhat configuration
│ └── package.json # Backend dependencies
|
└── frontend/ # Next.js frontend application
    ├── src/
    │ ├── components/ # React components
    │ ├── pages/ # Next.js pages
    │ ├── styles/ # CSS modules
    │ └── wagmi.ts # Wagmi configuration
    └── package.json # Frontend dependencies
```


## Further Reading

- **TypeScript Frontend**
  - [Next.js](https://nextjs.org/) - React framework
  - [RainbowKit](https://rainbowkit.com) - Wallet connection
  - [wagmi](https://wagmi.sh) - Ethereum hooks
  - [Viem](https://viem.sh) - Ethereum utilities

- **Smart Contract Backend**
  - [Hardhat](https://hardhat.org) - Development environment
  - [OpenZeppelin](https://openzeppelin.com) - Contract libraries
  - [Ethers.js](https://docs.ethers.org) - Ethereum library

## Smart Contract Development
For detailed instructions on local development and testing with Hardhat, see our [Hardhat Guide](docs/HARDHAT.md). This guide covers:
- Setting up a local blockchain
- Deploying contracts locally
- Running tests
- Connecting your wallet to the local network
- For deploying to Sepolia testnet, see our [Testnet Deployment Guide](docs/TESTNET.md)

## Contributing

This is a workshop demonstration project. Feel free to fork and modify for your own learning purposes!

## License

MIT

