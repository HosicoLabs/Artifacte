'use client';

import { useMemo } from 'react';
import SectionWrapper from '@/comps/primitive/SectionWrapper';
import { recentRWAListings } from '@/lib/rwa-data';
import { RWAListing } from '@/lib/types';

interface RecentRWAListingsProps {
  searchQuery: string;
}

function ListingCard({ listing }: { listing: RWAListing }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-[#D9D9D9] hover:shadow-lg hover:border-[#191919] transition-all cursor-pointer group">
      {/* Thumbnail */}
      <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FAF6F3] flex-shrink-0 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[14px] md:text-[16px] text-[#0A0F2E] truncate group-hover:text-[#191919] transition-colors">
          {listing.name}
        </h3>
        <p className="text-[11px] md:text-[13px] text-[#6C737F] truncate">
          {listing.subtitle}
        </p>
      </div>

      {/* Price & Action */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="font-bold text-[14px] md:text-[16px] text-[#191919]">
            {listing.price}
          </p>
        </div>
        <button
          className="w-9 h-9 bg-[#191919] flex items-center justify-center hover:bg-[#111111] transition-colors"
          aria-label="Add to cart"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RecentRWAListings({ searchQuery }: RecentRWAListingsProps) {
  const filteredListings = useMemo(() => {
    if (!searchQuery?.trim()) {
      return recentRWAListings;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return recentRWAListings.filter(
      (listing) =>
        listing.name.toLowerCase().includes(lowerQuery) ||
        listing.subtitle.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <SectionWrapper className="bg-[#EEECE9]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] md:text-[32px] font-philosopher font-bold">
          Recent RWA Listings
        </h2>
        <button className="text-[#191919] text-[14px] md:text-[16px] font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#6C737F] text-[14px] md:text-[16px]">
            No listings found matching your search
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
