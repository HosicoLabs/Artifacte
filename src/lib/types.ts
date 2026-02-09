/**
 * Core type definitions for the NFT marketplace
 * No bid liquidity - only fixed price listings and individual offers
 */

// =============================================================================
// Solana & Wallet Types
// =============================================================================

export type PublicKeyString = string;

export interface WalletInfo {
  address: PublicKeyString;
  connected: boolean;
}

// =============================================================================
// Collection Types
// =============================================================================

export interface WhitelistedCollection {
  /** Collection address (Metaplex Certified Collection) */
  address: PublicKeyString;
  /** Display name */
  name: string;
  /** Collection symbol */
  symbol: string;
  /** Collection description */
  description: string;
  /** Collection image/banner URL */
  image: string;
  /** Optional external website */
  website?: string;
  /** Optional Twitter/X handle */
  twitter?: string;
  /** Optional Discord invite */
  discord?: string;
  /** Total supply of NFTs in collection */
  totalSupply: number;
  /** Whether collection is currently active for trading */
  isActive: boolean;
  /** Date collection was whitelisted */
  whitelistedAt: Date;
}

export interface CollectionStats {
  /** Collection address */
  collectionAddress: PublicKeyString;
  /** Floor price in SOL */
  floorPrice: number;
  /** Total volume traded in SOL */
  totalVolume: number;
  /** Number of unique holders */
  uniqueHolders: number;
  /** Number of items currently listed */
  listedCount: number;
  /** Last updated timestamp */
  updatedAt: Date;
}

// =============================================================================
// NFT Types
// =============================================================================

export interface NFTAttribute {
  traitType: string;
  value: string;
  /** Optional rarity percentage */
  rarity?: number;
}

export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  animationUrl?: string;
  externalUrl?: string;
  attributes: NFTAttribute[];
}

export interface NFT {
  /** Mint address of the NFT */
  mint: PublicKeyString;
  /** Current owner wallet address */
  owner: PublicKeyString;
  /** Collection address this NFT belongs to */
  collectionAddress: PublicKeyString;
  /** NFT metadata */
  metadata: NFTMetadata;
  /** Token standard (pNFT, NFT, etc.) */
  tokenStandard: 'NonFungible' | 'ProgrammableNonFungible' | 'NonFungibleEdition';
  /** Whether the NFT is currently listed for sale */
  isListed: boolean;
  /** Listing details if listed */
  listing?: Listing;
  /** Active offers on this NFT */
  offers: Offer[];
}

// =============================================================================
// Listing Types (Fixed Price Only - No Bid Liquidity)
// =============================================================================

export type ListingStatus = 'active' | 'sold' | 'cancelled' | 'expired';

export interface Listing {
  /** Unique listing ID */
  id: string;
  /** NFT mint address */
  nftMint: PublicKeyString;
  /** Seller wallet address */
  seller: PublicKeyString;
  /** Listed price in SOL */
  price: number;
  /** Listing status */
  status: ListingStatus;
  /** When the listing was created */
  createdAt: Date;
  /** Optional expiration date */
  expiresAt?: Date;
  /** Transaction signature of listing */
  listingTx?: string;
}

// =============================================================================
// Offer Types (Individual Offers Only - No Pooled Bids)
// =============================================================================

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'expired';

export interface Offer {
  /** Unique offer ID */
  id: string;
  /** NFT mint address this offer is for */
  nftMint: PublicKeyString;
  /** Buyer wallet address making the offer */
  buyer: PublicKeyString;
  /** Offer amount in SOL */
  amount: number;
  /** Offer status */
  status: OfferStatus;
  /** When the offer was created */
  createdAt: Date;
  /** When the offer expires */
  expiresAt: Date;
  /** Optional message from buyer */
  message?: string;
}

// =============================================================================
// Transaction & Activity Types
// =============================================================================

export type ActivityType = 'listing' | 'sale' | 'offer' | 'offer_accepted' | 'offer_rejected' | 'transfer' | 'mint';

export interface Activity {
  /** Unique activity ID */
  id: string;
  /** Type of activity */
  type: ActivityType;
  /** NFT mint address */
  nftMint: PublicKeyString;
  /** From wallet (seller/sender) */
  from: PublicKeyString;
  /** To wallet (buyer/receiver) */
  to?: PublicKeyString;
  /** Price in SOL (for sales/listings) */
  price?: number;
  /** Transaction signature */
  signature: string;
  /** When the activity occurred */
  timestamp: Date;
}

// =============================================================================
// Live Auction Types (Timer-based bidding)
// =============================================================================

export type AuctionStatus = 'upcoming' | 'live' | 'ended' | 'settled' | 'cancelled';

export interface AuctionBid {
  /** Unique bid ID */
  id: string;
  /** Auction ID this bid belongs to */
  auctionId: string;
  /** Bidder wallet address */
  bidder: PublicKeyString;
  /** Bid amount in SOL */
  amount: number;
  /** When the bid was placed */
  timestamp: Date;
  /** Transaction signature */
  signature: string;
}

export interface Auction {
  /** Unique auction ID */
  id: string;
  /** NFT mint address being auctioned */
  nftMint: PublicKeyString;
  /** Seller wallet address */
  seller: PublicKeyString;
  /** Starting price in SOL */
  startingPrice: number;
  /** Reserve price in SOL (minimum to sell) */
  reservePrice?: number;
  /** Current highest bid */
  currentBid?: AuctionBid;
  /** All bids on this auction */
  bids: AuctionBid[];
  /** Auction status */
  status: AuctionStatus;
  /** When the auction starts */
  startsAt: Date;
  /** When the auction ends */
  endsAt: Date;
  /** Minimum bid increment in SOL */
  minBidIncrement: number;
  /** Extension time in seconds when bid placed near end */
  extensionTime: number;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// =============================================================================
// Filter & Sort Types
// =============================================================================

export type SortField = 'price' | 'recentlyListed' | 'rarity' | 'name';
export type SortDirection = 'asc' | 'desc';

export interface NFTFilters {
  collectionAddress?: PublicKeyString;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, string[]>;
  isListed?: boolean;
  sortBy?: SortField;
  sortDirection?: SortDirection;
}

// =============================================================================
// RWA (Real World Assets) Types
// =============================================================================

export type RWACategory = 
  | 'real-estate' 
  | 'digital-art' 
  | 'agriculture' 
  | 'aviation' 
  | 'precious-metals';

export interface RWAAsset {
  /** Unique asset ID */
  id: string;
  /** Asset name */
  name: string;
  /** Asset category */
  category: RWACategory;
  /** Asset type/subtitle */
  assetType: string;
  /** Asset image URL */
  image: string;
  /** Price per share in USD */
  sharePrice: number;
  /** Total number of shares */
  totalShares: number;
  /** Number of shares sold */
  sharesSold: number;
  /** Whether fractional ownership is available */
  fractionalOwnership: boolean;
  /** Associated NFT mint (if tokenized) */
  nftMint?: PublicKeyString;
  /** Asset description */
  description?: string;
}

export interface RWAListing {
  /** Unique listing ID */
  id: string;
  /** Asset name */
  name: string;
  /** Asset subtitle/description */
  subtitle: string;
  /** Price in USD or per unit */
  price: string;
  /** Thumbnail image URL */
  image: string;
  /** Asset category */
  category: RWACategory;
  /** Whether item is featured */
  featured?: boolean;
}
