# Local Development with Hardhat

## What is Hardhat?
Hardhat is a development environment for Ethereum smart contracts. Think of it like a local server for web development, but for blockchain. When you run Hardhat locally, you get:

- A local blockchain network for testing
- Test accounts pre-loaded with ETH
- Instant transaction processing (no waiting!)
- Full control over the network state

## Getting Started

1. Start the local Hardhat network:
```bash
npx hardhat node
```

This command starts a local blockchain at `http://127.0.0.1:8545`. You'll see a list of 20 test accounts with their private keys, each loaded with 10,000 test ETH.

2. Deploy your contracts to the local network. Open a new terminal and run:
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

3. Run tests against your local network:

```bash
npx hardhat test
```


## Understanding Local Development

When you're developing on Hardhat:
- Every transaction is instant
- You don't need real ETH
- You can reset the network state at any time
- You can debug transactions easily

This is perfect for:
- Testing your smart contracts
- Developing your frontend without spending real ETH
- Debugging complex contract interactions
- Running automated tests

## Connecting Your Frontend

To connect your frontend (like MetaMask) to your local Hardhat network:

1. Add Hardhat Network to MetaMask:
   - Network Name: Hardhat
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

2. Import a test account:
   - Copy a private key from the Hardhat node output
   - Import into MetaMask using "Import Account"

## Common Commands

- `npx hardhat node`: Start the local Hardhat network
- `npx hardhat run scripts/deploy.ts --network localhost`: Deploy contracts to the local network
- `npx hardhat compile`: Compile contracts
- `npx hardhat test`: Run tests against the local network

## Tips for Development
- Always restart your Hardhat node if you make contract changes
- Use `console.log()` in your contracts for debugging (import "hardhat/console.sol")
- Keep the node terminal open to see transaction logs
- Remember that each Hardhat node restart resets the blockchain state