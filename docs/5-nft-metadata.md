# NFT Metadata and Standards

## Overview

NFTs (Non-Fungible Tokens) are unique digital assets on the blockchain. While the token itself lives on-chain, the metadata (images, attributes, etc.) is typically stored off-chain. This guide covers:

- ERC721 Token Standard
- NFT Metadata Structure
- IPFS for Decentralized Storage
- OpenSea Metadata Standard

## ERC721 Token Standard

ERC721 is the most common NFT standard on Ethereum, and we use it in our project in `contracts/SimpleNFT.sol`. Key functions include:

```solidity
interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
}

```
In our `SimpleNFT.sol` contract, we implement the `IERC721` interface using the OpenZeppelin library, which is a popular open-source library for secure and efficient smart contract development.

## NFT Metadata Structure

Notice that within our `SimpleNFT.sol` contract, we have a `baseURI` attribute in our constructor that returns a JSON object. This is the metadata base URI for our NFTs, which records the name, description, image, and other attributes of the NFT:

```solidity
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
}
```

In our particular example, we copied the baseURI from the Azuki NFT contract, which is a popular NFT collection on Ethereum. You should change this to your own NFT metadata with your own projects.

## IPFS for Decentralized Storage

If you look at the `baseURI` attribute though, notice that it uses the prefix `ipfs://`. This is because we are using IPFS for decentralized storage. [IPFS](https://ipfs.io/) is a decentralized storage system that allows us to store our NFT metadata on a decentralized network, which is much more secure and reliable than a centralized server. Of course, you can also use a regular HTTP URL if you don't want to use IPFS.

To access an IPFS address on a regular browser, you can use the following URL:
```
https://ipfs.io/ipfs/<CID>
```

where `<CID>` is the content identifier of the file you want to access, in the Azuki example, `QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4`.

## OpenSea Metadata Standard

Within the Azuki example, you can see that each NFT ID has a corresponding JSON file, which is stored in the same IPFS folder as the image. For example, the NFT ID `1` has a corresponding JSON file `1.json`, which is stored in the same IPFS folder as the image `1.png`. If you go to the URL `https://ipfs.io/ipfs/QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/1`, you can see the metadata for the NFT with ID `1`:

```json
{
  "name": "Azuki #1",
  "image": "ipfs://QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png",
  "attributes": [
    {
      "trait_type": "Type",
      "value": "Human"
    },
    {
      "trait_type": "Hair",
      "value": "Pink Hairband"
    },
    {
      "trait_type": "Clothing",
      "value": "White Qipao with Fur"
    },
    {
      "trait_type": "Eyes",
      "value": "Daydreaming"
    },
    {
      "trait_type": "Mouth",
      "value": "Lipstick"
    },
    {
      "trait_type": "Offhand",
      "value": "Gloves"
    },
    {
      "trait_type": "Background",
      "value": "Off White D"
    }
  ]
}
```

This metadata follows the [OpenSea Metadata Standard](https://docs.opensea.io/docs/metadata-standards), which is a popular standard for NFT metadata. Key features include:

```json
{
  "name": "Asset Name",
  "description": "Description of asset",
  "image": "ipfs://...",
  "external_url": "https://...",
  "attributes": [
    {
      "trait_type": "Property",
      "value": "Value",
      "display_type": "number",
      "max_value": 100
    }
  ],
  "animation_url": "https://...",
  "youtube_url": "https://..."
}
```

This allows OpenSea to display the metadata for your NFT collection in a more user-friendly way. In our code, this is rendered as:

```ts
const viewOnOpenSea = () => {
    window.open(`https://testnets.opensea.io/assets/sepolia/${NFT_CONTRACT_ADDRESS}`, '_blank');
  };
```

## Best Practices

- Immutable Storage: Use IPFS or similar decentralized storage for metadata if possible (though this is technically more challenging)
- Base URI Pattern: Use a base URI + token ID pattern for scalability
- Metadata Freezing: Consider implementing metadata freezing to prevent changes
- Rich Metadata: Include detailed attributes for better marketplace display
- Image Optimization: Optimize images before uploading to IPFS
- Backup: Pin IPFS content on multiple services

## Next Steps

- Explore the OpenSea Metadata Standard and see how you can implement it in your own project
- Try using a different base URI pattern for your NFTs. You can just use a regular HTTPS URL with JSONs stored on a centralized server
- Try out IPFS, Arweave, or other decentralized storage solutions to see how they work

Part 1: [Anatomy of an Ethereum DApp](docs/1-intro.md)

Part 2: [Frontend TypeScript Stack](docs/2-frontend.md)

Part 3: [Backend Smart Contract Stack](docs/3-backend.md)

Part 4: [Deploying Smart Contracts (Local and Sepolia Testnet)](docs/4-deploy.md)
