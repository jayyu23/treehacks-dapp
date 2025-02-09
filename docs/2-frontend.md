# Frontend TypeScript Stack

## Overview

The frontend of our DApp is built using modern TypeScript tools and frameworks that make it easy to interact with the Ethereum blockchain. The main components are:

- **Next.js** - React framework for building the user interface
- **RainbowKit** - Wallet connection management
- **Wagmi** - React hooks for Ethereum interactions
- **Viem** - Low-level Ethereum utilities

## Next.js and TypeScript

Many web3 developers use Next.js for their frontend. It is a popular React framework that provides a robust foundation for building web applications. It offers features like:

- Server-side rendering (SSR) and static site generation (SSG)
- File-based routing
- API routes
- Built-in TypeScript support
- Automatic code splitting
- Hot module replacement during development
- Easy deployment to Vercel

To create a new Next.js application with TypeScript, developers typically use the `create-next-app` command. However, we have already created a Next.js application for you in the `frontend` directory using the create-rainbowkit command, which is a wrapper around create-next-app with RainbowKit pre-installed.

If you were to start from scratch, you would use the following command:
```bash
npx create-next-app@latest --typescript
```

Typescript is a statically typed superset of JavaScript that compiles to plain JavaScript. It is a popular language for building web3 applications because it is easy to understand and write, while being more robust than JavaScript for type safety and large codebases. Most web3 frameworks such as Viem, Wagmi, and RainbowKit have native support for TypeScript.

To run a local development server, you can use the following command:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the pages in the webapp by modifying `pages/index.tsx`. The page auto-updates as you edit the file. If you want to deploy this app, you can use Vercel.


## RainbowKit

RainbowKit is a wallet connection library that makes it easy to connect to Ethereum wallets. It is a popular choice for web3 developers because it is easy to use and customizable, compatible with many wallet providers like MetaMask, Coinbase Wallet, etc. Its functionality includes:
- Multiple wallet connections (MetaMask, Coinbase Wallet, etc.)
- Chain switching
- ENS name resolution
- Connection state management

In our application, we installed a default RainbowKit Next.js template, which includes the RainbowKit library and a default wallet connection modal using the command:

```bash
npx create-rainbowkit@latest
```

## Wagmi

Wagmi is a React library for interacting with the Ethereum blockchain, that can allow us to handle transactions, read data from the blockchain, and more. For example, we use Wagmi to send a transaction in `src/pages/index.tsx` based on the user's input.

```tsx
// import { useSendTransaction, useChainId } from 'wagmi';
  // State variables
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const chainId = useChainId();

  // Wagmi hooks
  const { data, sendTransaction, error: sendError, isSuccess, isPending } = useSendTransaction();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chainId !== 11155111) { // Sepolia chain ID
      alert('Please switch to Sepolia network');
      return;
    }
    if (sendTransaction) {
      sendTransaction({
        to: to.trim() as `0x${string}`,
        value: parseEther(amount),
      })
    }
  };
```

Another example is in `src/pages/mint.tsx`, where we use Wagmi to mint an NFT:

```tsx
// import { useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';

  const { data: hash, writeContract, error: writeError } = useWriteContract();
  

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    if (chainId !== 11155111) { // Sepolia chain ID
      alert('Please switch to Sepolia network');
      return;
    }

    // The ABI (Application Binary Interface) defines how to interact with the smart contract
    // It specifies the contract's functions, their parameters, and return values
    // Think of it as an API specification that tells our frontend how to call contract methods
    // We only need the mint function ABI here since that's all we're calling
    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: [{
        name: 'mint',
        type: 'function',
        stateMutability: 'payable',
        inputs: [],
        outputs: [],
      }],
      value: parseEther('0.01'), // MINT_PRICE from SimpleNFT contract
    });
  };
```

This second example is more complex, as it involves writing to a smart contract. We need two things:
1. The address of the contract
2. The ABI of the contract

The smart contract address that we are actually interacting with:
```tsx
// TODO: Replace with your deployed contract address. This is a sample address for the SimpleNFT contract.
const NFT_CONTRACT_ADDRESS = "0x488b34f16720dc659a1bb9f3bf34a1e47734df61";
```

The ABI of a contract is like a "function signature" that tells our frontend how to call contract methods. Whenever we compile the smart contract in the backend (covered in Part 3), we will get the corresponding ABI that we can copy over and use in our frontend.