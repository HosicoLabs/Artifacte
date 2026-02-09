'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import SectionWrapper from '@/comps/primitive/SectionWrapper';
import { Auction } from '@/lib/types';

// =============================================================================
// Countdown Timer Utilities
// =============================================================================

function useCountdown(endTime: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
} {
  const calculateTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isEnded: false };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

// =============================================================================
// Countdown Display Component
// =============================================================================

interface CountdownBadgeProps {
  endTime: Date;
}

function CountdownBadge({ endTime }: CountdownBadgeProps) {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(endTime);

  if (isEnded) {
    return (
      <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#191919] text-white text-[10px] md:text-[11px] font-bold rounded-lg">
        ENDED
      </div>
    );
  }

  const formatTime = () => {
    if (days > 0) {
      return `${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#191919]/90 backdrop-blur text-white text-[10px] md:text-[11px] font-mono font-bold rounded-lg flex items-center gap-1.5">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      {formatTime()}
    </div>
  );
}

// =============================================================================
// Mock Auction Data (reuse from auctions page later)
// =============================================================================

const MOCK_AUCTIONS: Array<{
  auction: Auction;
  metadata: { name: string; image: string; symbol: string };
}> = [
  {
    auction: {
      id: '1',
      nftMint: 'fine-art-a',
      seller: 'seller1',
      startingPrice: 12.4,
      currentBid: {
        id: 'bid1',
        auctionId: '1',
        bidder: 'bidder1',
        amount: 12.4,
        timestamp: new Date(),
        signature: 'sig1',
      },
      bids: [],
      status: 'live',
      startsAt: new Date(Date.now() - 3600000),
      endsAt: new Date(Date.now() + 86400000 + 43200000), // 1d 12h from now
      minBidIncrement: 0.1,
      extensionTime: 300,
    },
    metadata: {
      name: 'Fine Art Collection A',
      image: '/img/hand-crafted-storage.png',
      symbol: 'DIGITAL ART',
    },
  },
  {
    auction: {
      id: '2',
      nftMint: 'logistics-hub',
      seller: 'seller2',
      startingPrice: 85.25,
      currentBid: {
        id: 'bid2',
        auctionId: '2',
        bidder: 'bidder2',
        amount: 85.25,
        timestamp: new Date(),
        signature: 'sig2',
      },
      bids: [],
      status: 'live',
      startsAt: new Date(Date.now() - 7200000),
      endsAt: new Date(Date.now() + 28800000), // 8h from now
      minBidIncrement: 1.0,
      extensionTime: 300,
    },
    metadata: {
      name: 'Logistics Hub Nevada',
      image: '/img/pair-of-molina-armless.png',
      symbol: 'REAL ESTATE',
    },
  },
  {
    auction: {
      id: '3',
      nftMint: 'gold-vault',
      seller: 'seller3',
      startingPrice: 50.0,
      currentBid: {
        id: 'bid3',
        auctionId: '3',
        bidder: 'bidder3',
        amount: 52.5,
        timestamp: new Date(),
        signature: 'sig3',
      },
      bids: [],
      status: 'live',
      startsAt: new Date(Date.now() - 1800000),
      endsAt: new Date(Date.now() + 172800000), // 2d from now
      minBidIncrement: 0.5,
      extensionTime: 300,
    },
    metadata: {
      name: 'Gold Reserve Collection',
      image: '/img/edwin-dining-chair.png',
      symbol: 'PRECIOUS METALS',
    },
  },
];

// =============================================================================
// Auction Card Component
// =============================================================================

interface AuctionCardProps {
  auction: Auction;
  metadata: { name: string; image: string; symbol: string };
}

function AuctionCard({ auction, metadata }: AuctionCardProps) {
  const currentBid = auction.currentBid?.amount ?? auction.startingPrice;
  const isLive = auction.status === 'live';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#D9D9D9] cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-[#FAF6F3] relative">
        <img
          src={metadata.image}
          alt={metadata.name}
          className="w-full h-full object-cover"
        />

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#AC463A] text-white text-[10px] md:text-[11px] font-bold rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}

        {/* Countdown Timer */}
        <CountdownBadge endTime={auction.endsAt} />
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-[10px] md:text-[11px] text-[#857F94] uppercase font-medium mb-1">
          {metadata.symbol}
        </p>
        <h3 className="font-medium text-[#0A0F2E] text-[14px] md:text-[16px] mb-3">
          {metadata.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] md:text-[11px] text-[#857F94] mb-1">
              CURRENT BID
            </p>
            <p className="font-bold text-[#191919] text-[16px] md:text-[18px]">
              ${currentBid.toFixed(3)}
              <span className="text-[12px] md:text-[14px] text-[#857F94] font-normal ml-1">
                K
              </span>
            </p>
          </div>

          <button className="bg-[#191919] text-white px-4 py-2 text-[12px] md:text-[14px] font-medium hover:bg-[#111111] transition-colors">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Live Auctions Section
// =============================================================================

interface LiveAuctionsProps {
  searchQuery: string;
}

export default function LiveAuctions({ searchQuery }: LiveAuctionsProps) {
  const filteredAuctions = useMemo(() => {
    if (!searchQuery?.trim()) {
      return MOCK_AUCTIONS;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return MOCK_AUCTIONS.filter(({ metadata }) =>
      metadata.name.toLowerCase().includes(lowerQuery) ||
      metadata.symbol.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <SectionWrapper className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[24px] md:text-[32px] font-philosopher font-bold">
            Live Auctions
          </h2>
          <div className="w-2 h-2 bg-[#AC463A] rounded-full animate-pulse" />
        </div>
        <Link
          href="/auctions"
          className="text-[#191919] text-[14px] md:text-[16px] font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Auction Grid */}
      {filteredAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map(({ auction, metadata }) => (
            <AuctionCard key={auction.id} auction={auction} metadata={metadata} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#6C737F] text-[14px] md:text-[16px]">
            No live auctions found matching your search
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
