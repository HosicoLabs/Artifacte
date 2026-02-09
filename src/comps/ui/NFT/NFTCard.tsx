'use client';

/**
 * NFT Card Component
 *
 * Displays an NFT with its price (no bid liquidity, no "sell now")
 * Only shows: Image, Name, Listed Price, Collection
 */

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { NFT, Listing } from '@/lib/types';
import Picture from '@/comps/primitive/Picture';

interface NFTCardProps {
  nft: NFT;
  listing?: Listing;
  className?: string;
  showCollection?: boolean;
}

export default function NFTCard({ nft, listing, className, showCollection = false }: NFTCardProps) {
  const isListed = listing?.status === 'active';

  return (
    <Link
      href={`/collections/${nft.mint}`}
      className={twMerge(
        'group block rounded-2xl bg-white border border-[#D9D9D9] overflow-hidden transition-shadow hover:shadow-lg',
        className
      )}
    >
      {/* NFT Image */}
      <div className="aspect-square overflow-hidden bg-[#FAF6F3]">
        <Picture
          src={nft.metadata.image}
          alt={nft.metadata.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* NFT Details */}
      <div className="p-4">
        {/* Collection name (optional) */}
        {showCollection && (
          <p className="mb-1 text-xs text-[#857F94] uppercase tracking-wide">
            {nft.metadata.symbol}
          </p>
        )}

        {/* NFT Name */}
        <h3 className="font-medium text-[#0A0F2E] text-lg capitalize line-clamp-1">
          {nft.metadata.name}
        </h3>

        {/* Price Section - Fixed price only, no bids */}
        <div className="mt-3 flex items-center justify-between">
          {isListed ? (
            <div>
              <p className="text-xs text-[#857F94] capitalize">Price</p>
              <p className="font-bold text-[#191919]">
                {listing.price.toFixed(2)}{' '}
                <span className="text-[#857F94] text-sm uppercase">SOL</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#857F94] capitalize">Status</p>
              <p className="text-[#6B7280] text-sm">Not Listed</p>
            </div>
          )}

          {/* Buy Now indicator - only if listed */}
          {isListed && (
            <span className="px-3 py-1.5 bg-[#191919] text-white text-xs font-medium rounded-full">
              Buy Now
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
