import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import Navbar from '../components/Navbar';
import { parseEther } from 'viem';

// TODO: Replace with your deployed contract address. This is a sample address for the SimpleNFT contract.
const NFT_CONTRACT_ADDRESS = "0x488b34f16720dc659a1bb9f3bf34a1e47734df61";

const MintPage: NextPage = () => {
  const chainId = useChainId();
  
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

  const buttonStyle = {
    padding: '14px 28px',
    backgroundColor: '#0d76fc',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    marginTop: '20px',
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint NFT - TreeHacks DApp</title>
        <meta name="description" content="Mint your TreeHacks NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint Your NFT 🎨
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>SimpleNFT Collection</h2>
            <p>Mint Price: 0.01 ETH</p>
            
            <button
              onClick={handleMint}
              disabled={isConfirming}
              style={buttonStyle}
            >
              {isConfirming ? 'Minting...' : 'Mint NFT'}
            </button>

            {writeError && (
              <div style={{ marginTop: '16px', color: 'red' }}>
                Error: {writeError.message}
              </div>
            )}

            {isConfirmed && (
              <div style={{ marginTop: '16px', color: 'green' }}>
                Successfully minted your NFT!
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Etherscan
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MintPage;
