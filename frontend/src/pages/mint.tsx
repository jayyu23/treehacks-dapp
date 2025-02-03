import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import Navbar from '../components/Navbar';
import { parseEther } from 'viem';

// TODO: Replace with your deployed contract address. This is a sample address for the SimpleNFT contract.
const NFT_CONTRACT_ADDRESS = "0x488b34f16720dc659a1bb9f3bf34a1e47734df61";
// Sample NFT image URL - replace with your actual NFT preview image
const NFT_PREVIEW_URL = "https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png";

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

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    marginLeft: '10px',
  };

  const previewStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '12px',
    marginBottom: '20px',
    objectFit: 'cover' as const,
    border: '1px solid #eaeaea',
  };

  const viewOnOpenSea = () => {
    window.open(`https://testnets.opensea.io/assets/sepolia/${NFT_CONTRACT_ADDRESS}`, '_blank');
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
            <img 
              src={NFT_PREVIEW_URL}
              alt="NFT Preview"
              style={previewStyle}
            />
            <h2>SimpleNFT Collection</h2>
            <p>Mint Price: 0.01 ETH</p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleMint}
                disabled={isConfirming}
                style={buttonStyle}
              >
                {isConfirming ? 'Minting...' : 'Mint NFT'}
              </button>

              <button
                onClick={viewOnOpenSea}
                style={secondaryButtonStyle}
              >
                View on OpenSea
              </button>
            </div>

            {writeError && (
              <div style={{ marginTop: '16px', color: 'red' }}>
                Error: {writeError.message}
              </div>
            )}

            {isConfirmed && (
              <div style={{ marginTop: '16px', color: 'green' }}>
                Successfully minted your NFT!
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0d76fc' }}
                  >
                    View on Etherscan
                  </a>
                  <span>|</span>
                  <a
                    href={`https://testnets.opensea.io/assets/sepolia/${NFT_CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0d76fc' }}
                  >
                    View on OpenSea
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
