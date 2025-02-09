import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { parseEther } from 'viem';
import { useSendTransaction, useChainId } from 'wagmi'
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const chainId = useChainId();

  const { data, sendTransaction, error: sendError, isSuccess, isPending } = useSendTransaction();

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

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #e1e1e1',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#0d76fc',
      boxShadow: '0 0 0 3px rgba(13, 118, 252, 0.1)',
    }
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
    '&:hover': {
      backgroundColor: '#0a5fd9',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
      transform: 'none',
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TreeHacks DApp</title>
        <meta name="description" content="Simple ETH transfer application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          🌴 TreeHacks DApp
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="recipient">Recipient Address:</label>
                <input
                  type="text"
                  id="recipient"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="0x..."
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label htmlFor="amount">Amount (ETH):</label>
                <input
                  type="number"
                  id="amount"
                  step="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.1"
                  style={inputStyle}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isPending || !sendTransaction || !to || !amount}
                style={buttonStyle}
              >
                {isPending ? 'Sending...' : 'Send ETH'}
              </button>

              {sendError && (
                <div style={{ marginTop: '16px', color: 'red' }}>
                  Error sending transaction: {sendError.message}
                </div>
              )}
            </form>

            {isSuccess && (
              <div style={{ marginTop: '16px', color: 'green' }}>
                Successfully sent {amount} ETH to {to}!
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
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

      <footer className={styles.footer}>
        <a
          href="https://rainbow.me"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made with ❤️ by your frens at Stanford Blockchain Club
        </a>
      </footer>
    </div>
  );
};

export default Home;