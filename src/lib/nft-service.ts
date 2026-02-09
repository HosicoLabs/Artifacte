/**
 * NFT Data Service
 *
 * Fetches NFT data from Helius DAS API (Digital Asset Standard)
 * Only returns NFTs from whitelisted collections
 */

import type {
  NFT,
  NFTMetadata,
  NFTAttribute,
  NFTFilters,
  PaginatedResponse,
  CollectionStats,
  Listing,
  Offer,
} from './types';
import { isCollectionWhitelisted, getWhitelistedAddresses } from './whitelist';

// =============================================================================
// Configuration
// =============================================================================

function getHeliusUrl(): string {
  // Use the full URL from env (which may already include api-key)
  const url = process.env.NEXT_PUBLIC_HELIUS_API_URL;
  if (url) {
    return url;
  }

  // Fallback: construct URL with separate API key
  const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY ?? '';
  const baseUrl = 'https://mainnet.helius-rpc.com';
  return apiKey ? `${baseUrl}/?api-key=${apiKey}` : baseUrl;
}

// =============================================================================
// Helius DAS API Types
// =============================================================================

interface HeliusAsset {
  id: string;
  content: {
    json_uri: string;
    metadata: {
      name: string;
      symbol: string;
      description?: string;
      attributes?: Array<{ trait_type: string; value: string }>;
    };
    files?: Array<{ uri: string; mime: string }>;
    links?: {
      image?: string;
      animation_url?: string;
      external_url?: string;
    };
  };
  ownership: {
    owner: string;
    delegated: boolean;
  };
  grouping: Array<{
    group_key: string;
    group_value: string;
  }>;
  royalty?: {
    basis_points: number;
  };
  compression?: {
    compressed: boolean;
  };
  interface: string;
}

interface HeliusSearchResponse {
  result: {
    total: number;
    limit: number;
    page: number;
    items: HeliusAsset[];
  };
}

interface HeliusAssetResponse {
  result: HeliusAsset;
}

// =============================================================================
// Transform Functions
// =============================================================================

function getCollectionAddress(asset: HeliusAsset): string | undefined {
  const collectionGroup = asset.grouping.find((g) => g.group_key === 'collection');
  return collectionGroup?.group_value;
}

/**
 * Check if an asset is a Collection NFT itself (not an item in a collection)
 */
function isCollectionNFT(asset: HeliusAsset): boolean {
  // Collection NFTs have empty grouping and are often the address we whitelist
  return asset.grouping.length === 0 && isCollectionWhitelisted(asset.id);
}

function transformHeliusAssetToNFT(asset: HeliusAsset): NFT | null {
  let collectionAddress = getCollectionAddress(asset);

  // Check if this is actually a Collection NFT itself
  if (!collectionAddress && isCollectionNFT(asset)) {
    // The asset IS a collection NFT - use its own ID as the collection address
    collectionAddress = asset.id;
  }

  // Only return NFTs from whitelisted collections
  if (!collectionAddress || !isCollectionWhitelisted(collectionAddress)) {
    return null;
  }

  const attributes: NFTAttribute[] =
    asset.content.metadata.attributes?.map((attr) => ({
      traitType: attr.trait_type,
      value: attr.value,
    })) ?? [];

  const metadata: NFTMetadata = {
    name: asset.content.metadata.name,
    symbol: asset.content.metadata.symbol,
    description: asset.content.metadata.description ?? '',
    image: asset.content.links?.image ?? asset.content.files?.[0]?.uri ?? '',
    animationUrl: asset.content.links?.animation_url,
    externalUrl: asset.content.links?.external_url,
    attributes,
  };

  // Determine token standard from interface
  let tokenStandard: NFT['tokenStandard'] = 'NonFungible';
  if (asset.interface === 'ProgrammableNFT') {
    tokenStandard = 'ProgrammableNonFungible';
  }

  return {
    mint: asset.id,
    owner: asset.ownership.owner,
    collectionAddress,
    metadata,
    tokenStandard,
    isListed: false, // Will be updated when we fetch listings
    offers: [], // Will be populated from our database
  };
}

// =============================================================================
// API Functions
// =============================================================================

/**
 * Fetch a single NFT by mint address
 */
export async function getNFTByMint(mintAddress: string): Promise<NFT | null> {
  try {
    const url = getHeliusUrl();
    console.log('[NFT Service] Fetching NFT:', mintAddress);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-asset',
        method: 'getAsset',
        params: { id: mintAddress },
      }),
    });

    if (!response.ok) {
      console.error('[NFT Service] HTTP Error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    // Check for JSON-RPC error
    if (data.error) {
      console.error('[NFT Service] API Error:', data.error);
      return null;
    }

    if (!data.result) {
      console.error('[NFT Service] No result in response');
      return null;
    }

    console.log('[NFT Service] Got asset:', data.result.id, data.result.content?.metadata?.name);

    const nft = transformHeliusAssetToNFT(data.result);

    if (!nft) {
      console.log('[NFT Service] NFT filtered out (not from whitelisted collection)');
    }

    return nft;
  } catch (error) {
    console.error('[NFT Service] Exception:', error);
    return null;
  }
}

/**
 * Fetch NFTs by owner wallet address
 * Only returns NFTs from whitelisted collections
 */
export async function getNFTsByOwner(
  ownerAddress: string,
  page = 1,
  pageSize = 50
): Promise<PaginatedResponse<NFT>> {
  const response = await fetch(getHeliusUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'get-assets-by-owner',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress,
        page,
        limit: pageSize,
        displayOptions: {
          showCollectionMetadata: true,
        },
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to fetch NFTs by owner:', response.statusText);
    return { items: [], total: 0, page, pageSize, hasMore: false };
  }

  const data: HeliusSearchResponse = await response.json();

  // Filter to only whitelisted collections
  const nfts = data.result.items
    .map(transformHeliusAssetToNFT)
    .filter((nft): nft is NFT => nft !== null);

  return {
    items: nfts,
    total: data.result.total,
    page: data.result.page,
    pageSize: data.result.limit,
    hasMore: data.result.items.length === pageSize,
  };
}

/**
 * Fetch NFTs from a specific collection
 */
export async function getNFTsByCollection(
  collectionAddress: string,
  page = 1,
  pageSize = 50
): Promise<PaginatedResponse<NFT>> {
  // Verify collection is whitelisted
  if (!isCollectionWhitelisted(collectionAddress)) {
    console.warn('Attempted to fetch non-whitelisted collection:', collectionAddress);
    return { items: [], total: 0, page, pageSize, hasMore: false };
  }

  const response = await fetch(getHeliusUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'get-assets-by-group',
      method: 'getAssetsByGroup',
      params: {
        groupKey: 'collection',
        groupValue: collectionAddress,
        page,
        limit: pageSize,
        displayOptions: {
          showCollectionMetadata: true,
        },
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to fetch NFTs by collection:', response.statusText);
    return { items: [], total: 0, page, pageSize, hasMore: false };
  }

  const data: HeliusSearchResponse = await response.json();

  const nfts = data.result.items
    .map(transformHeliusAssetToNFT)
    .filter((nft): nft is NFT => nft !== null);

  return {
    items: nfts,
    total: data.result.total,
    page: data.result.page,
    pageSize: data.result.limit,
    hasMore: data.result.items.length === pageSize,
  };
}

/**
 * Search NFTs across all whitelisted collections
 */
export async function searchNFTs(
  filters: NFTFilters,
  page = 1,
  pageSize = 50
): Promise<PaginatedResponse<NFT>> {
  // If a specific collection is requested, verify it's whitelisted
  if (filters.collectionAddress && !isCollectionWhitelisted(filters.collectionAddress)) {
    return { items: [], total: 0, page, pageSize, hasMore: false };
  }

  // Get collection(s) to search
  const collectionsToSearch = filters.collectionAddress
    ? [filters.collectionAddress]
    : getWhitelistedAddresses();

  // Fetch from each collection and combine results
  const allNFTs: NFT[] = [];

  for (const collectionAddress of collectionsToSearch) {
    const result = await getNFTsByCollection(collectionAddress, page, pageSize);
    allNFTs.push(...result.items);
  }

  // Apply filters
  let filteredNFTs = allNFTs;

  if (filters.attributes) {
    filteredNFTs = filteredNFTs.filter((nft) => {
      for (const [traitType, values] of Object.entries(filters.attributes ?? {})) {
        const nftAttr = nft.metadata.attributes.find(
          (a) => a.traitType.toLowerCase() === traitType.toLowerCase()
        );
        if (!nftAttr || !values.includes(nftAttr.value)) {
          return false;
        }
      }
      return true;
    });
  }

  // Apply sorting
  if (filters.sortBy) {
    const direction = filters.sortDirection === 'desc' ? -1 : 1;

    filteredNFTs.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return direction * a.metadata.name.localeCompare(b.metadata.name);
        case 'price':
          const priceA = a.listing?.price ?? 0;
          const priceB = b.listing?.price ?? 0;
          return direction * (priceA - priceB);
        default:
          return 0;
      }
    });
  }

  return {
    items: filteredNFTs,
    total: filteredNFTs.length,
    page,
    pageSize,
    hasMore: filteredNFTs.length === pageSize,
  };
}

// =============================================================================
// Listing Functions (Local State - To be replaced with database/on-chain)
// =============================================================================

// In-memory store for listings (replace with database in production)
const listingsStore = new Map<string, Listing>();

/**
 * Create a new listing for an NFT
 * Only allows NFTs from whitelisted collections
 */
export async function createListing(
  nftMint: string,
  seller: string,
  price: number
): Promise<Listing | null> {
  // Verify NFT is from whitelisted collection
  const nft = await getNFTByMint(nftMint);
  if (!nft) {
    console.error('Cannot list: NFT not found or not from whitelisted collection');
    return null;
  }

  // Verify seller owns the NFT
  if (nft.owner !== seller) {
    console.error('Cannot list: Seller does not own this NFT');
    return null;
  }

  const listing: Listing = {
    id: `listing-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    nftMint,
    seller,
    price,
    status: 'active',
    createdAt: new Date(),
  };

  listingsStore.set(nftMint, listing);
  return listing;
}

/**
 * Get listing for an NFT
 */
export function getListing(nftMint: string): Listing | undefined {
  const listing = listingsStore.get(nftMint);
  if (listing?.status === 'active') {
    return listing;
  }
  return undefined;
}

/**
 * Get all active listings
 */
export function getAllListings(): Listing[] {
  return Array.from(listingsStore.values()).filter((l) => l.status === 'active');
}

/**
 * Cancel a listing
 */
export function cancelListing(nftMint: string, seller: string): boolean {
  const listing = listingsStore.get(nftMint);
  if (!listing || listing.seller !== seller) {
    return false;
  }

  listing.status = 'cancelled';
  listingsStore.set(nftMint, listing);
  return true;
}

// =============================================================================
// Offer Functions (Local State - To be replaced with database)
// =============================================================================

// In-memory store for offers (replace with database in production)
const offersStore = new Map<string, Offer[]>();

/**
 * Create an offer on an NFT
 * Individual offers only - no pooled bids
 */
export async function createOffer(
  nftMint: string,
  buyer: string,
  amount: number,
  expiresInHours = 24,
  message?: string
): Promise<Offer | null> {
  // Verify NFT is from whitelisted collection
  const nft = await getNFTByMint(nftMint);
  if (!nft) {
    console.error('Cannot make offer: NFT not found or not from whitelisted collection');
    return null;
  }

  // Cannot make offer on own NFT
  if (nft.owner === buyer) {
    console.error('Cannot make offer: You own this NFT');
    return null;
  }

  const offer: Offer = {
    id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    nftMint,
    buyer,
    amount,
    status: 'pending',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
    message,
  };

  const existingOffers = offersStore.get(nftMint) ?? [];
  existingOffers.push(offer);
  offersStore.set(nftMint, existingOffers);

  return offer;
}

/**
 * Get all offers for an NFT
 */
export function getOffersForNFT(nftMint: string): Offer[] {
  const offers = offersStore.get(nftMint) ?? [];
  const now = new Date();

  // Filter out expired offers
  return offers.filter((o) => o.status === 'pending' && o.expiresAt > now);
}

/**
 * Accept an offer (only NFT owner can accept)
 */
export function acceptOffer(offerId: string, owner: string): boolean {
  for (const [nftMint, offers] of offersStore.entries()) {
    const offerIndex = offers.findIndex((o) => o.id === offerId);
    if (offerIndex !== -1) {
      // TODO: Verify owner owns the NFT
      offers[offerIndex].status = 'accepted';
      offersStore.set(nftMint, offers);
      return true;
    }
  }
  return false;
}

/**
 * Cancel an offer (only offer maker can cancel)
 */
export function cancelOffer(offerId: string, buyer: string): boolean {
  for (const [nftMint, offers] of offersStore.entries()) {
    const offerIndex = offers.findIndex((o) => o.id === offerId && o.buyer === buyer);
    if (offerIndex !== -1) {
      offers[offerIndex].status = 'cancelled';
      offersStore.set(nftMint, offers);
      return true;
    }
  }
  return false;
}

// =============================================================================
// Collection Stats (Mock - To be replaced with real data)
// =============================================================================

/**
 * Get stats for a collection
 */
export async function getCollectionStats(collectionAddress: string): Promise<CollectionStats | null> {
  if (!isCollectionWhitelisted(collectionAddress)) {
    return null;
  }

  // TODO: Fetch real stats from indexer or aggregate from listings
  return {
    collectionAddress,
    floorPrice: 0,
    totalVolume: 0,
    uniqueHolders: 0,
    listedCount: getAllListings().filter((l) => l.status === 'active').length,
    updatedAt: new Date(),
  };
}
