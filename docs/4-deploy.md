# Deploying Smart Contracts

## Overview

After developing and testing smart contracts locally, the next step is deploying them to a blockchain network. We'll cover two main deployment scenarios:

1. Local deployment using Hardhat Network
2. Testnet deployment to Ethereum Sepolia

The deployment process involves:
- Configuring the deployment environment
- Setting up network connections
- Managing private keys and RPC URLs
- Verifying contract deployment
- Updating frontend configurations

## Local Development with Hardhat Network

Hardhat provides a local blockchain network perfect for development and testing. This is useful for testing and developing smart contracts without the need for real ETH.

When you run Hardhat locally, you get:

- A local blockchain at `http://127.0.0.1:8545`
- 20 test accounts pre-loaded with 10,000 ETH each
- Instant transaction processing
- Full control over the network state

To start a local Hardhat blockchain, run the following command:

```bash
npx hardhat node
```

This will start a local blockchain with 20 test accounts pre-loaded with 10,000 ETH each.

In a separate terminal, deploy your contracts:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

This will deploy your contracts to the local Hardhat network.


## Deploying to Sepolia Testnet

Sepolia is an Ethereum testnet - a blockchain network that mimics Ethereum Mainnet but uses test ETH that has no real value. Before deploying to Sepolia, you'll need:

1. A Sepolia RPC URL from a provider like Alchemy or Infura
2. A wallet private key with some Sepolia ETH
3. Test ETH from a faucet like [Sepolia Faucet](https://sepoliafaucet.com)

### Configuration Setup

1. Create a `.env` file in the `backend` directory, and add the following:
```bash
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

  - You can get your private key from a MetaMask wallet [here](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key).

  - You can get your Sepolia RPC URL from [Infura](https://www.infura.io) or [Alchemy](https://www.alchemy.com/).


2. Update your Hardhat configuration by going to `hardhat.config.ts` and uncomment the `sepolia` network configuration.

3. Deploy your contracts to Sepolia by running the following command:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

This will deploy your contracts to the Sepolia testnet and return the contract addresses. For example, you might get `0x488b34f16720dc659a1bb9f3bf34a1e47734df61` for the SimpleNFT contract.

4. Update the frontend configuration in `frontend/src/pages/mint.tsx` by going to `frontend/src/pages/mint.tsx` and replacing the `NFT_CONTRACT_ADDRESS` with the address you got from the deployment. The frontend code will now interact with your deployed contract on Sepolia.

5. The ABI (Application Binary Interface) is automatically generated when you compile your contracts. You can find it in `backend/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json` for the SimpleNFT contract. Copy the function signatures that you need from the ABI and paste them into `frontend/src/pages/mint.tsx`.
  - As your application grows, you can also write scripts to automatically copy smart contract ABIs to frontend code.

## Testing on Sepolia

1. Your contract interactions will now take 15-30 seconds (block time)
2. Each transaction will cost test ETH
3. You can view your transactions on [Sepolia Etherscan](https://sepolia.etherscan.io)

## Best Practices

1. **Environment Management**
   - Never commit private keys or RPC URLs
   - Use `.env` files for sensitive data
   - Keep separate configurations for different networks

2. **Deployment Process**
   - Always test contracts locally first
   - Keep track of deployed contract addresses
   - Document deployment steps
   - Verify contracts on Etherscan (optional but recommended)

3. **Security**
   - Use a dedicated testing wallet
   - Never use wallets with real funds for testing
   - Double-check network configurations before deployment

## Troubleshooting Common Issues

1. **Insufficient Funds**
   - Make sure you have enough test ETH for deployment
   - Get more from Sepolia faucet

2. **Network Issues**
   - Verify RPC URL is correct
   - Check network status
   - Ensure wallet is connected to correct network

3. **Contract Verification**
   - Double-check constructor arguments
   - Use correct compiler version
   - Wait for transaction confirmation

## Next Steps

After successful deployment:
- Test your contract on Sepolia testnet
- Update frontend configuration
- Verify contract on Etherscan
- Document deployed addresses
- Test full application flow

Part 1: [Anatomy of an Ethereum DApp](1-intro.md)

Part 2: [Frontend TypeScript Stack](2-frontend.md)

Part 3: [Backend Smart Contract Stack](3-backend.md)

Part 5: [NFT Metadata and Standards](5-nft-metadata.md)
