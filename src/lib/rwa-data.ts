/**
 * Mock RWA (Real World Assets) data for dashboard
 */

import { RWAAsset, RWAListing, RWACategory, RWAAuction } from './types';

// =============================================================================
// Institutional Assets
// =============================================================================

export const institutionalAssets: RWAAsset[] = [
  {
    id: 'azure-bay-residence',
    name: 'Azure Bay Residence',
    category: 'real-estate',
    assetType: 'Luxury Waterfront Property',
    image: '/img/collection-item-1.png',
    sharePrice: 125000,
    totalShares: 100,
    sharesSold: 47,
    fractionalOwnership: true,
    description: 'Premium waterfront residence in exclusive Azure Bay community',
  },
  {
    id: 'heritage-tower',
    name: 'Heritage Tower',
    category: 'real-estate',
    assetType: 'Commercial Office Building',
    image: '/img/collection-item-2.png',
    sharePrice: 250000,
    totalShares: 200,
    sharesSold: 134,
    fractionalOwnership: true,
    description: 'Class A office building in prime downtown location',
  },
  {
    id: 'logistics-hub-nevada',
    name: 'Logistics Hub Nevada',
    category: 'real-estate',
    assetType: 'Industrial Warehouse',
    image: '/img/collection-item-3.png',
    sharePrice: 85250,
    totalShares: 120,
    sharesSold: 89,
    fractionalOwnership: true,
    description: 'Strategic logistics facility with premium tenants',
  },
  {
    id: 'fine-art-collection-a',
    name: 'Fine Art Collection A',
    category: 'digital-art',
    assetType: 'Curated Art Portfolio',
    image: '/img/collection-item-4.png',
    sharePrice: 12400,
    totalShares: 50,
    sharesSold: 31,
    fractionalOwnership: true,
    description: 'Premium collection of authenticated digital artworks',
  },
  {
    id: 'california-vineyard',
    name: 'California Vineyard Estate',
    category: 'agriculture',
    assetType: 'Wine Production',
    image: '/img/oakwood-cabinet.png',
    sharePrice: 75000,
    totalShares: 80,
    sharesSold: 42,
    fractionalOwnership: true,
    description: 'Established vineyard with premium wine production',
  },
  {
    id: 'private-jet-fleet',
    name: 'Private Jet Fleet',
    category: 'aviation',
    assetType: 'Aircraft Investment',
    image: '/img/collection-item-5.png',
    sharePrice: 500000,
    totalShares: 40,
    sharesSold: 28,
    fractionalOwnership: true,
    description: 'Yield-bearing aviation investment portfolio',
  },
  {
    id: 'gold-reserve-vault',
    name: 'Gold Reserve Collection',
    category: 'precious-metals',
    assetType: 'Physical Gold Holdings',
    image: '/img/collection-item-6.png',
    sharePrice: 50000,
    totalShares: 100,
    sharesSold: 73,
    fractionalOwnership: true,
    description: 'Certified gold reserves in secure vault storage',
  },
  {
    id: 'modern-art-masters',
    name: 'Modern Art Masters',
    category: 'digital-art',
    assetType: 'Contemporary Collection',
    image: '/img/collection-item-7.png',
    sharePrice: 18500,
    totalShares: 60,
    sharesSold: 44,
    fractionalOwnership: true,
    description: 'Curated collection of contemporary digital masters',
  },
];

// =============================================================================
// Recent RWA Listings
// =============================================================================

export const recentRWAListings: RWAListing[] = [
  {
    id: 'zambian-emerald',
    name: 'Zambian Emerald 4ct',
    subtitle: 'Certified Precious Gemstone',
    price: '$28,000',
    image: '/img/collection-item-8.png',
    category: 'precious-metals',
    featured: true,
  },
  {
    id: 'skylink-jet',
    name: 'SkyLink Jet Fleet',
    subtitle: 'Yield-bearing aviation RWA',
    price: '$5,000 / Tier',
    image: '/img/sydney-armchair.png',
    category: 'aviation',
  },
  {
    id: 'tuscany-vineyard',
    name: 'Tuscany Vineyard Estate',
    subtitle: 'Fractional Agricultural Asset',
    price: '$150,000 / Share',
    image: '/img/collection-item-9.png',
    category: 'agriculture',
  },
  {
    id: 'platinum-bars',
    name: 'Platinum Bar Collection',
    subtitle: 'Physical Precious Metal Holdings',
    price: '$45,000 / Bar',
    image: '/img/collection-item-10.png',
    category: 'precious-metals',
  },
  {
    id: 'miami-penthouse',
    name: 'Miami Oceanfront Penthouse',
    subtitle: 'Luxury Real Estate Fraction',
    price: '$200,000 / Share',
    image: '/img/collection-item-11.png',
    category: 'real-estate',
  },
  {
    id: 'digital-sculpture',
    name: 'Eternal Light Sculpture',
    subtitle: 'Premium Digital Art NFT',
    price: '$32,500',
    image: '/img/collection-item-12.png',
    category: 'digital-art',
  },
];

// =============================================================================
// Category Labels
// =============================================================================

export const categoryLabels: Record<string, string> = {
  'all': 'All RWAs',
  'real-estate': 'Real Estate',
  'digital-art': 'Digital Art Coll...',
  'agriculture': 'Agriculture',
  'aviation': 'Aviation',
  'precious-metals': 'Precious Metals',
};

// =============================================================================
// Helper Functions
// =============================================================================

export function getAssetsByCategory(category?: RWACategory): RWAAsset[] {
  if (!category) {
    return institutionalAssets;
  }
  return institutionalAssets.filter((asset) => asset.category === category);
}

export function searchAssets(query: string): RWAAsset[] {
  if (!query?.trim()) {
    return institutionalAssets;
  }
  
  const lowerQuery = query.toLowerCase();
  return institutionalAssets.filter((asset) =>
    asset.name.toLowerCase().includes(lowerQuery) ||
    asset.assetType.toLowerCase().includes(lowerQuery) ||
    asset.description?.toLowerCase().includes(lowerQuery)
  );
}

export function searchListings(query: string): RWAListing[] {
  if (!query?.trim()) {
    return recentRWAListings;
  }
  
  const lowerQuery = query.toLowerCase();
  return recentRWAListings.filter((listing) =>
    listing.name.toLowerCase().includes(lowerQuery) ||
    listing.subtitle.toLowerCase().includes(lowerQuery)
  );
}

// =============================================================================
// RWA Auctions
// =============================================================================

export const rwaAuctions: RWAAuction[] = [
  {
    id: 'master-ultra-thin-calendar',
    name: 'Master Ultra Thin Perpetual Calendar',
    series: 'LUXURY CHRONOGRAPH SERIES',
    assetId: 'RWA-992-CH',
    image: '/img/collection-item-1.png',
    images: [
      '/img/collection-item-1.png',
      '/img/collection-item-2.png',
      '/img/collection-item-3.png',
    ],
    custodyVerified: true,
    appraisedValue: 34600,
    conditionGrade: 'Mint (Grade 1)',
    description: 'This asset is tokenized under a Special Purpose Vehicle (SPV) framework. Ownership represents a direct fractional legal claim to the physical asset held in insured secure storage. Legal title is managed by our Swiss-regulated custodian.',
    legalDescription: 'This asset is tokenized under a Special Purpose Vehicle (SPV) framework. Ownership represents a direct fractional legal claim to the physical asset held in insured secure storage. Legal title is managed by our Swiss-regulated custodian.',
    currentBidPrice: 28450,
    currentBidETH: 111,
    buyNowPrice: 29000,
    auctionEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    documents: [
      {
        id: 'doc-1',
        name: 'Certificate of Authenticity',
        type: 'certificate',
        url: '/documents/certificate-auth.pdf',
        size: 245000,
      },
      {
        id: 'doc-2',
        name: "Insurance Policy (Lloyd's)",
        type: 'insurance',
        url: '/documents/insurance-lloyds.pdf',
        size: 189000,
      },
    ],
    valuationHistory: [
      { date: new Date('2025-02-01'), value: 34600 },
      { date: new Date('2025-03-01'), value: 33800 },
      { date: new Date('2025-04-01'), value: 32200 },
      { date: new Date('2025-05-01'), value: 33500 },
      { date: new Date('2025-06-01'), value: 34200 },
      { date: new Date('2025-07-01'), value: 33900 },
      { date: new Date('2025-08-01'), value: 34100 },
      { date: new Date('2025-09-01'), value: 35200 },
      { date: new Date('2025-10-01'), value: 34800 },
      { date: new Date('2025-11-01'), value: 34500 },
      { date: new Date('2025-12-01'), value: 34300 },
      { date: new Date('2026-01-01'), value: 34600 },
    ],
    bidHistory: [
      {
        id: 'bid-1',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 28450,
        verified: true,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        id: 'bid-2',
        bidderName: 'Private Collector',
        bidderType: 'private',
        amount: 27900,
        verified: false,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
      {
        id: 'bid-3',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 27500,
        verified: true,
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      },
    ],
    category: 'precious-metals',
  },
  {
    id: 'vintage-porsche-911',
    name: 'Vintage Porsche 911 Turbo',
    series: 'CLASSIC AUTOMOTIVE COLLECTION',
    assetId: 'RWA-847-AU',
    image: '/img/collection-item-5.png',
    images: [
      '/img/collection-item-5.png',
      '/img/collection-item-6.png',
    ],
    custodyVerified: true,
    appraisedValue: 285000,
    conditionGrade: 'Excellent (Grade 2)',
    description: '1989 Porsche 911 Turbo in pristine condition. Fully authenticated with complete service history. Held in climate-controlled secure storage facility.',
    legalDescription: 'Vehicle ownership is tokenized through an SPV structure. Token holders have proportional legal rights to the vehicle. All storage, insurance, and maintenance costs are included for the auction period.',
    currentBidPrice: 245000,
    currentBidETH: 958,
    buyNowPrice: 265000,
    auctionEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    documents: [
      {
        id: 'doc-3',
        name: 'Certificate of Authenticity',
        type: 'certificate',
        url: '/documents/porsche-auth.pdf',
        size: 512000,
      },
      {
        id: 'doc-4',
        name: 'Insurance Certificate',
        type: 'insurance',
        url: '/documents/porsche-insurance.pdf',
        size: 298000,
      },
      {
        id: 'doc-5',
        name: 'Service History',
        type: 'other',
        url: '/documents/porsche-service.pdf',
        size: 1024000,
      },
    ],
    valuationHistory: [
      { date: new Date('2025-02-01'), value: 265000 },
      { date: new Date('2025-03-01'), value: 268000 },
      { date: new Date('2025-04-01'), value: 270000 },
      { date: new Date('2025-05-01'), value: 272000 },
      { date: new Date('2025-06-01'), value: 275000 },
      { date: new Date('2025-07-01'), value: 278000 },
      { date: new Date('2025-08-01'), value: 280000 },
      { date: new Date('2025-09-01'), value: 282000 },
      { date: new Date('2025-10-01'), value: 283000 },
      { date: new Date('2025-11-01'), value: 284000 },
      { date: new Date('2025-12-01'), value: 284500 },
      { date: new Date('2026-01-01'), value: 285000 },
    ],
    bidHistory: [
      {
        id: 'bid-4',
        bidderName: 'Private Collector',
        bidderType: 'private',
        amount: 245000,
        verified: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: 'bid-5',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 240000,
        verified: true,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      },
    ],
    category: 'aviation',
  },
  {
    id: 'rare-whisky-cask',
    name: 'Macallan 1990 Sherry Cask',
    series: 'RARE SPIRITS COLLECTION',
    assetId: 'RWA-623-SP',
    image: '/img/oakwood-cabinet.png',
    images: ['/img/oakwood-cabinet.png'],
    custodyVerified: true,
    appraisedValue: 125000,
    conditionGrade: 'Mint (Grade 1)',
    description: 'Rare 1990 Macallan Sherry Oak cask with exceptional provenance. Stored in bonded warehouse in Scotland with full authenticity certification.',
    legalDescription: 'Cask ownership is represented through tokenized shares. Each token represents proportional ownership of the cask contents. All storage and insurance fees covered through the auction period.',
    currentBidPrice: 98500,
    currentBidETH: 385,
    buyNowPrice: 115000,
    auctionEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    documents: [
      {
        id: 'doc-6',
        name: 'Cask Certificate',
        type: 'certificate',
        url: '/documents/whisky-cert.pdf',
        size: 156000,
      },
      {
        id: 'doc-7',
        name: 'Warehouse Receipt',
        type: 'legal',
        url: '/documents/whisky-warehouse.pdf',
        size: 98000,
      },
    ],
    valuationHistory: [
      { date: new Date('2025-02-01'), value: 105000 },
      { date: new Date('2025-03-01'), value: 107000 },
      { date: new Date('2025-04-01'), value: 109000 },
      { date: new Date('2025-05-01'), value: 111000 },
      { date: new Date('2025-06-01'), value: 113000 },
      { date: new Date('2025-07-01'), value: 115000 },
      { date: new Date('2025-08-01'), value: 117000 },
      { date: new Date('2025-09-01'), value: 119000 },
      { date: new Date('2025-10-01'), value: 121000 },
      { date: new Date('2025-11-01'), value: 123000 },
      { date: new Date('2025-12-01'), value: 124000 },
      { date: new Date('2026-01-01'), value: 125000 },
    ],
    bidHistory: [
      {
        id: 'bid-6',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 98500,
        verified: true,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
      {
        id: 'bid-7',
        bidderName: 'Private Collector',
        bidderType: 'private',
        amount: 95000,
        verified: true,
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
      },
      {
        id: 'bid-8',
        bidderName: 'Private Collector',
        bidderType: 'private',
        amount: 92000,
        verified: false,
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
      },
    ],
    category: 'agriculture',
  },
  {
    id: 'picasso-lithograph',
    name: 'Pablo Picasso Original Lithograph',
    series: 'FINE ART MASTERS',
    assetId: 'RWA-334-AR',
    image: '/img/collection-item-4.png',
    images: [
      '/img/collection-item-4.png',
      '/img/collection-item-7.png',
    ],
    custodyVerified: true,
    appraisedValue: 425000,
    conditionGrade: 'Excellent (Grade 2)',
    description: 'Original Picasso lithograph from 1962, authenticated by leading art experts. Museum-quality piece with impeccable provenance.',
    legalDescription: 'Artwork is held in a museum-grade climate-controlled vault. Ownership is fractionalized through tokenization, with each token representing legal claim to proportional ownership.',
    currentBidPrice: 385000,
    currentBidETH: 1505,
    buyNowPrice: 410000,
    auctionEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    documents: [
      {
        id: 'doc-8',
        name: 'Certificate of Authenticity',
        type: 'certificate',
        url: '/documents/picasso-auth.pdf',
        size: 678000,
      },
      {
        id: 'doc-9',
        name: 'Appraisal Report',
        type: 'appraisal',
        url: '/documents/picasso-appraisal.pdf',
        size: 1245000,
      },
      {
        id: 'doc-10',
        name: 'Insurance Policy',
        type: 'insurance',
        url: '/documents/picasso-insurance.pdf',
        size: 234000,
      },
    ],
    valuationHistory: [
      { date: new Date('2025-02-01'), value: 395000 },
      { date: new Date('2025-03-01'), value: 398000 },
      { date: new Date('2025-04-01'), value: 402000 },
      { date: new Date('2025-05-01'), value: 405000 },
      { date: new Date('2025-06-01'), value: 408000 },
      { date: new Date('2025-07-01'), value: 410000 },
      { date: new Date('2025-08-01'), value: 413000 },
      { date: new Date('2025-09-01'), value: 416000 },
      { date: new Date('2025-10-01'), value: 419000 },
      { date: new Date('2025-11-01'), value: 422000 },
      { date: new Date('2025-12-01'), value: 423500 },
      { date: new Date('2026-01-01'), value: 425000 },
    ],
    bidHistory: [
      {
        id: 'bid-9',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 385000,
        verified: true,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: 'bid-10',
        bidderName: 'Private Collector',
        bidderType: 'private',
        amount: 375000,
        verified: true,
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      },
      {
        id: 'bid-11',
        bidderName: 'Institutional Bidder',
        bidderType: 'institutional',
        amount: 365000,
        verified: true,
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
      },
    ],
    category: 'digital-art',
  },
];

// =============================================================================
// Auction Helper Functions
// =============================================================================

export function getAuctionById(id: string): RWAAuction | undefined {
  return rwaAuctions.find((auction) => auction.id === id);
}

export function getAuctionsByCategory(category?: RWACategory): RWAAuction[] {
  if (!category) {
    return rwaAuctions;
  }
  return rwaAuctions.filter((auction) => auction.category === category);
}

export function searchAuctions(query: string): RWAAuction[] {
  if (!query?.trim()) {
    return rwaAuctions;
  }
  
  const lowerQuery = query.toLowerCase();
  return rwaAuctions.filter((auction) =>
    auction.name.toLowerCase().includes(lowerQuery) ||
    auction.series.toLowerCase().includes(lowerQuery) ||
    auction.description.toLowerCase().includes(lowerQuery)
  );
}
