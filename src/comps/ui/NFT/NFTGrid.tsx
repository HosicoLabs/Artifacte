'use client';

/**
 * NFT Grid Component
 *
 * Displays a grid of NFTs from whitelisted collections
 * NO bid liquidity - just fixed price listings
 */

import { useState, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/comps/primitive/Button';
import NFTCard from '@/comps/ui/NFT/NFTCard';
import {
  getNFTsByCollection,
  searchNFTs,
  getListing,
  getAllListings,
} from '@/lib/nft-service';
import {
  getAllWhitelistedCollections,
  getWhitelistedCollection,
} from '@/lib/whitelist';
import type { NFT, NFTFilters, Listing, WhitelistedCollection } from '@/lib/types';

// =============================================================================
// Filter Components
// =============================================================================

interface CollectionFilterProps {
  collections: WhitelistedCollection[];
  selected: string | null;
  onSelect: (address: string | null) => void;
}

function CollectionFilter({ collections, selected, onSelect }: CollectionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => onSelect(null)}
        className={twMerge(
          'px-4 py-2 rounded-full text-sm capitalize',
          selected === null ? 'bg-[#191919] text-white' : 'bg-white text-[#6B7280] border border-[#D9D9D9]'
        )}
      >
        All Collections
      </Button>
      {collections.map((collection) => (
        <Button
          key={collection.address}
          onClick={() => onSelect(collection.address)}
          className={twMerge(
            'px-4 py-2 rounded-full text-sm',
            selected === collection.address
              ? 'bg-[#191919] text-white'
              : 'bg-white text-[#6B7280] border border-[#D9D9D9]'
          )}
        >
          {collection.name}
        </Button>
      ))}
    </div>
  );
}

interface SortFilterProps {
  sortBy: NFTFilters['sortBy'];
  sortDirection: NFTFilters['sortDirection'];
  onSortChange: (sortBy: NFTFilters['sortBy'], direction: NFTFilters['sortDirection']) => void;
}

function SortFilter({ sortBy, sortDirection, onSortChange }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#6B7280]">Sort by:</span>
      <select
        value={`${sortBy}-${sortDirection}`}
        onChange={(e) => {
          const [newSortBy, newDirection] = e.target.value.split('-') as [
            NFTFilters['sortBy'],
            NFTFilters['sortDirection']
          ];
          onSortChange(newSortBy, newDirection);
        }}
        className="px-3 py-2 border border-[#D9D9D9] rounded-lg bg-white text-sm"
      >
        <option value="recentlyListed-desc">Recently Listed</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}

interface ListedFilterProps {
  showListedOnly: boolean;
  onToggle: (value: boolean) => void;
}

function ListedFilter({ showListedOnly, onToggle }: ListedFilterProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={showListedOnly}
        onChange={(e) => onToggle(e.target.checked)}
        className="w-4 h-4 accent-[#AC463A]"
      />
      <span className="text-sm text-[#6B7280]">Show listed only</span>
    </label>
  );
}

// =============================================================================
// Search Component
// =============================================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name..."
        className="w-full pl-10 pr-4 py-3 border border-[#D9D9D9] rounded-xl bg-white placeholder:text-[#857F94]"
      />
      <img
        src="/img/search-dark.png"
        alt="Search"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
      />
    </div>
  );
}

// =============================================================================
// Pagination Component
// =============================================================================

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const start = Math.max(1, currentPage - 2);
    return start + i;
  }).filter((p) => p <= totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 bg-white border border-[#D9D9D9] disabled:opacity-50"
      >
        <img src="/img/chevron-left.png" className="w-5" alt="Previous" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={twMerge(
            'px-4 py-2 rounded-lg',
            page === currentPage
              ? 'bg-[#191919] text-white'
              : 'bg-white text-[#6B7280] border border-[#D9D9D9]'
          )}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 bg-white border border-[#D9D9D9] disabled:opacity-50"
      >
        <img src="/img/chevron-right.png" className="w-5" alt="Next" />
      </Button>
    </div>
  );
}

// =============================================================================
// Main NFT Grid Component
// =============================================================================

interface NFTGridProps {
  initialCollection?: string;
}

export default function NFTGrid({ initialCollection }: NFTGridProps) {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [listings, setListings] = useState<Map<string, Listing>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    initialCollection ?? null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showListedOnly, setShowListedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<NFTFilters['sortBy']>('recentlyListed');
  const [sortDirection, setSortDirection] = useState<NFTFilters['sortDirection']>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  const collections = getAllWhitelistedCollections();

  // Fetch NFTs
  const fetchNFTs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const filters: NFTFilters = {
      collectionAddress: selectedCollection ?? undefined,
      isListed: showListedOnly ? true : undefined,
      sortBy,
      sortDirection,
    };

    const result = await searchNFTs(filters, currentPage, pageSize);

    // Apply search filter client-side (for name search)
    let filteredNFTs = result.items;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredNFTs = filteredNFTs.filter(
        (nft) =>
          nft.metadata.name.toLowerCase().includes(query) ||
          nft.metadata.symbol.toLowerCase().includes(query)
      );
    }

    // Filter by listed status if needed
    if (showListedOnly) {
      const allListings = getAllListings();
      const listedMints = new Set(allListings.map((l) => l.nftMint));
      filteredNFTs = filteredNFTs.filter((nft) => listedMints.has(nft.mint));
    }

    setNFTs(filteredNFTs);
    setTotalCount(result.total);

    // Build listings map
    const listingsMap = new Map<string, Listing>();
    for (const nft of filteredNFTs) {
      const listing = getListing(nft.mint);
      if (listing) {
        listingsMap.set(nft.mint, listing);
      }
    }
    setListings(listingsMap);

    setIsLoading(false);
  }, [selectedCollection, searchQuery, showListedOnly, sortBy, sortDirection, currentPage]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCollection, searchQuery, showListedOnly, sortBy, sortDirection]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center gap-4">
          <ListedFilter showListedOnly={showListedOnly} onToggle={setShowListedOnly} />
          <SortFilter
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={(newSort, newDir) => {
              setSortBy(newSort);
              setSortDirection(newDir);
            }}
          />
        </div>
      </div>

      {/* Collection Filter */}
      <CollectionFilter
        collections={collections}
        selected={selectedCollection}
        onSelect={setSelectedCollection}
      />

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280]">
          {isLoading ? 'Loading...' : `${nfts.length} items`}
          {selectedCollection && (
            <span className="ml-2">
              in {getWhitelistedCollection(selectedCollection)?.name}
            </span>
          )}
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchNFTs} className="mt-2 bg-red-600 text-white">
            Retry
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-[#E5E5E5] animate-pulse"
            />
          ))}
        </div>
      )}

      {/* NFT Grid */}
      {!isLoading && nfts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.mint}
              nft={nft}
              listing={listings.get(nft.mint)}
              showCollection={!selectedCollection}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && nfts.length === 0 && !error && (
        <div className="py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-[#0A0F2E] mb-2">No NFTs found</h3>
          <p className="text-[#6B7280]">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'No NFTs are currently available in this collection'}
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
