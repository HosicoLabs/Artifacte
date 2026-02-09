/**
 * Whitelisted NFT Collections Configuration
 *
 * Only collections in this list can be traded on the platform.
 * This prevents random NFTs from being listed and maintains curation quality.
 */

import type { WhitelistedCollection } from './types';

/**
 * Map of whitelisted collection addresses to their metadata.
 * Key: Collection address (Metaplex Certified Collection address)
 */
export const WHITELISTED_COLLECTIONS: Record<string, WhitelistedCollection> = {
  // ============================================================================
  // Example: Solana Monkey Business (SMB)
  // ============================================================================
  SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W: {
    address: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
    name: 'Solana Monkey Business',
    symbol: 'SMB',
    description:
      'Solana Monkey Business is a collection of 5000 randomly generated, unique and rare digital collectibles living on the Solana blockchain.',
    image: 'https://arweave.net/VNfJT8w08VaHe7TLN_VR8AawVd3qVH4O4k7mCVAmfTo',
    website: 'https://solanamonkey.business',
    twitter: 'SolanaMBS',
    discord: 'https://discord.gg/smbgenesis',
    totalSupply: 5000,
    isActive: true,
    whitelistedAt: new Date('2024-01-01'),
  },

  // ============================================================================
  // Example: Mad Lads
  // ============================================================================
  'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w': {
    address: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w',
    name: 'Mad Lads',
    symbol: 'MAD',
    description: 'The first xNFT collection. Built by Backpack.',
    image: 'https://madlads.s3.us-west-2.amazonaws.com/images/0.png',
    website: 'https://madlads.com',
    twitter: 'MadLadsNFT',
    totalSupply: 10000,
    isActive: true,
    whitelistedAt: new Date('2024-01-15'),
  },

  // ============================================================================
  // Example: Claynosaurz
  // ============================================================================
  '6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK': {
    address: '6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK',
    name: 'Claynosaurz',
    symbol: 'CLAY',
    description:
      'Claynosaurz is a collection of 10,000 3D animated NFTs. Collect and earn Clay, our native token.',
    image: 'https://bafybeihkzuhv6s2iswnfnbwwjl3t5l6lmziwpmq75qzycfkn4shg6b7y3m.ipfs.dweb.link/',
    website: 'https://claynosaurz.com',
    twitter: 'Claynosaurz',
    discord: 'https://discord.gg/claynosaurz',
    totalSupply: 10000,
    isActive: true,
    whitelistedAt: new Date('2024-02-01'),
  },

  // ============================================================================
  // Example: Famous Fox Federation
  // ============================================================================
  BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac: {
    address: 'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac',
    name: 'Famous Fox Federation',
    symbol: 'FFF',
    description: 'The Famous Fox Federation is a collection of 7,777 randomly generated foxes.',
    image: 'https://famousfoxes.com/hd/1.png',
    website: 'https://famousfoxes.com',
    twitter: 'FamousFoxFed',
    totalSupply: 7777,
    isActive: true,
    whitelistedAt: new Date('2024-02-15'),
  },
};

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Check if a collection address is whitelisted
 */
export function isCollectionWhitelisted(collectionAddress: string): boolean {
  const collection = WHITELISTED_COLLECTIONS[collectionAddress];
  return collection?.isActive === true;
}

/**
 * Get whitelisted collection by address
 */
export function getWhitelistedCollection(
  collectionAddress: string
): WhitelistedCollection | undefined {
  const collection = WHITELISTED_COLLECTIONS[collectionAddress];
  if (collection?.isActive) {
    return collection;
  }
  return undefined;
}

/**
 * Get all active whitelisted collections
 */
export function getAllWhitelistedCollections(): WhitelistedCollection[] {
  return Object.values(WHITELISTED_COLLECTIONS).filter((c) => c.isActive);
}

/**
 * Get array of all whitelisted collection addresses
 */
export function getWhitelistedAddresses(): string[] {
  return Object.keys(WHITELISTED_COLLECTIONS).filter(
    (addr) => WHITELISTED_COLLECTIONS[addr].isActive
  );
}

/**
 * Validate that an NFT belongs to a whitelisted collection
 * Returns the collection if valid, undefined otherwise
 */
export function validateNFTCollection(
  nftCollectionAddress: string | undefined
): WhitelistedCollection | undefined {
  if (!nftCollectionAddress) {
    return undefined;
  }
  return getWhitelistedCollection(nftCollectionAddress);
}
