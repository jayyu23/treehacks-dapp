// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 public constant MINT_PRICE = 0.01 ether;
    uint256 public constant MAX_SUPPLY = 100;
    uint256 private currentTokenId;
    string private baseURI;

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {
        // Sample baseURI for Azuki. You should change this to your own NFT metadata
        // The JSON file should be in the same format as the Azuki example. For each NFT ID,
        // the JSON file should be named like `1.json` and stored in the same IPFS folder as the image.
        // If you don't want to use IPFS, you can just use a regular HTTP URL.
        // IPFS stands for InterPlanetary File System. More info here: https://ipfs.io/
        baseURI = "ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/";
    }

    function mint() external payable {
        require(msg.value >= MINT_PRICE, "Not enough ETH sent");
        require(currentTokenId < MAX_SUPPLY, "Max supply reached");

        currentTokenId++;
        _safeMint(msg.sender, currentTokenId);
    }

    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }
}