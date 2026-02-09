/**
 * Mock RWA (Real World Assets) data for dashboard
 */

import { RWAAsset, RWAListing, RWACategory } from './types';

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
