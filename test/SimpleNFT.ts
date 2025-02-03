import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseEther } from "viem";

describe("SimpleNFT", function () {
  async function deploySimpleNFTFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const simpleNFT = await hre.viem.deployContract("SimpleNFT");
    const publicClient = await hre.viem.getPublicClient();

    return {
      simpleNFT,
      owner,
      otherAccount,
      publicClient,
    };
  }

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

  describe("Minting", function () {
    it("Should allow minting with correct payment", async function () {
      const { simpleNFT, otherAccount } = await loadFixture(deploySimpleNFTFixture);
      
      const nftWithOtherAccount = await hre.viem.getContractAt(
        "SimpleNFT",
        simpleNFT.address,
        { client: { wallet: otherAccount } }
      );

      await expect(nftWithOtherAccount.write.mint({
        value: parseEther("0.01")
      })).to.be.fulfilled;

      expect(await simpleNFT.read.ownerOf([1n])).to.equal(
        getAddress(otherAccount.account.address)
      );
    });

    it("Should reject minting with insufficient payment", async function () {
      const { simpleNFT, otherAccount } = await loadFixture(deploySimpleNFTFixture);
      
      const nftWithOtherAccount = await hre.viem.getContractAt(
        "SimpleNFT",
        simpleNFT.address,
        { client: { wallet: otherAccount } }
      );

      await expect(nftWithOtherAccount.write.mint({
        value: parseEther("0.005")
      })).to.be.rejectedWith("Not enough ETH sent");
    });

    it("Should enforce max supply limit", async function () {
      const { simpleNFT, owner } = await loadFixture(deploySimpleNFTFixture);
      
      // Try to mint 101 NFTs (exceeding MAX_SUPPLY of 100)
      for (let i = 0; i < 100; i++) {
        await simpleNFT.write.mint({
          value: parseEther("0.01")
        });
      }

      await expect(simpleNFT.write.mint({
        value: parseEther("0.01")
      })).to.be.rejectedWith("Max supply reached");
    });
  });

  describe("Withdrawal", function () {
    it("Should allow owner to withdraw funds", async function () {
      const { simpleNFT, owner, otherAccount, publicClient } = await loadFixture(deploySimpleNFTFixture);
      
      // Mint an NFT to generate some funds
      const nftWithOtherAccount = await hre.viem.getContractAt(
        "SimpleNFT",
        simpleNFT.address,
        { client: { wallet: otherAccount } }
      );

      await nftWithOtherAccount.write.mint({
        value: parseEther("0.01")
      });

      const initialBalance = await publicClient.getBalance({
        address: owner.account.address
      });

      await simpleNFT.write.withdraw();

      const finalBalance = await publicClient.getBalance({
        address: owner.account.address
      });

      // Compare as BigInts
      expect(finalBalance > initialBalance).to.be.true;
    });

    it("Should prevent non-owners from withdrawing", async function () {
      const { simpleNFT, otherAccount } = await loadFixture(deploySimpleNFTFixture);
      
      const nftWithOtherAccount = await hre.viem.getContractAt(
        "SimpleNFT",
        simpleNFT.address,
        { client: { wallet: otherAccount } }
      );

      await expect(nftWithOtherAccount.write.withdraw())
        .to.be.rejectedWith("OwnableUnauthorizedAccount");
    });
  });
});