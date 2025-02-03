# Deploying to Sepolia Testnet

## What is Sepolia?
Sepolia is an Ethereum testnet - a blockchain network that mimics Ethereum Mainnet but uses test ETH that has no real value. It's perfect for testing your DApp before deploying to mainnet.

## What is an RPC URL?
An RPC URL (Remote Procedure Call URL) is a way to connect to and interact with a blockchain network. It's like the address or endpoint of the network that allows your application to communicate with the blockchain.

RPC URLs provide:
- A way to send transactions
- The ability to read blockchain data
- Access to smart contract interactions
- Network status information

You can get RPC URLs from infrastructure providers like Alchemy or Infura, who maintain reliable nodes that connect to the network. Using these providers is generally more reliable than running your own node.

For security, you should:
- Keep your RPC URLs private
- Use environment variables to store them
- Never commit them to version control

## Prerequisites

1. Get a Sepolia RPC URL:
   - Sign up for an account at [Alchemy](https://alchemy.com) or [Infura](https://infura.com)
   - Create a new project and get your Sepolia RPC URL

2. Get test ETH:
   - Visit [Sepolia Faucet](https://sepoliafaucet.com)
   - Connect your wallet and request test ETH
   - Wait for the ETH to arrive (usually takes a few minutes)

3. Get your private key:
   - Export your private key from MetaMask (Settings > Security & Privacy)
   - ⚠️ Never share or commit your private key
   - ⚠️ Never use a wallet with real funds for testing, otherwise you will lose your funds!

## Configuration

1. Create a `.env` file in your project root:
```bash
touch .env
```

2. Add your private key and RPC URL to the `.env` file:
```bash
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

3. Make sure your `hardhat.config.ts` is set up to include the Sepolia network:
```ts
const config = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  }
};

```

## Deploying to Sepolia

1. Run the deploy script:
```bash
npx hardhat deploy --network sepolia
```

2. Save the deployed contract address - you'll need it for your frontend.

3. Verify your contract on Etherscan.io (optional but recommended):


## Frontend Integration

1. Update your contract address in the frontend.

## Testing on Sepolia

1. Your contract interactions will now take 15-30 seconds (block time)
2. Each transaction will cost test ETH
3. You can view your transactions on [Sepolia Etherscan](https://sepolia.etherscan.io)

## Best Practices

1. Always test locally first using Hardhat
2. Keep track of your deployed contract addresses
3. Never commit sensitive information like private keys
4. Use a dedicated testing wallet
5. Document your deployment process

## Troubleshooting

Common issues:
- "Insufficient funds": Get more test ETH from the faucet
- "Nonce too high": Reset your MetaMask account
- "Gas estimation failed": Check your contract parameters
- "Contract verification failed": Double-check constructor arguments

## Next Steps
- Deploy your SimpleNFT contract to Sepolia
- Test minting and transactions
- Verify your contract on Etherscan
- Update your frontend to interact with the deployed contract