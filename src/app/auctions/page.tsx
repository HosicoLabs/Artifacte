'use client';

/**
 * Live Auctions Page
 *
 * Timer-based bidding auctions
 * Users bid against a countdown clock
 * NO instant liquidity - real auctions with real competition
 */

import { useState, useEffect, useCallback } from 'react';
import { useWalletUi } from '@wallet-ui/react';
import { twMerge } from 'tailwind-merge';
import Button from '@/comps/primitive/Button';
import SectionWrapper from '@/comps/primitive/SectionWrapper';
import Picture from '@/comps/primitive/Picture';
import type { Auction, AuctionBid, NFT } from '@/lib/types';

// =============================================================================
// Countdown Timer Hook
// =============================================================================

function useCountdown(endTime: Date): { days: number; hours: number; minutes: number; seconds: number; isEnded: boolean } {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

function calculateTimeLeft(endTime: Date) {
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
}

// =============================================================================
// Timer Display Component
// =============================================================================

interface CountdownDisplayProps {
  endTime: Date;
  size?: 'sm' | 'lg';
}

function CountdownDisplay({ endTime, size = 'sm' }: CountdownDisplayProps) {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(endTime);

  if (isEnded) {
    return (
      <div className="text-[#AC463A] font-bold">Auction Ended</div>
    );
  }

  const boxClass = size === 'lg'
    ? 'w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#191919] text-white flex flex-col items-center justify-center'
    : 'w-12 h-12 rounded-lg bg-[#FAF6F3] flex flex-col items-center justify-center';

  const numberClass = size === 'lg' ? 'text-2xl md:text-3xl font-bold' : 'text-lg font-bold';
  const labelClass = size === 'lg' ? 'text-xs text-[#857F94]' : 'text-[10px] text-[#857F94]';

  return (
    <div className="flex gap-2">
      {days > 0 && (
        <div className={boxClass}>
          <span className={numberClass}>{days}</span>
          <span className={labelClass}>Days</span>
        </div>
      )}
      <div className={boxClass}>
        <span className={numberClass}>{String(hours).padStart(2, '0')}</span>
        <span className={labelClass}>Hrs</span>
      </div>
      <div className={boxClass}>
        <span className={numberClass}>{String(minutes).padStart(2, '0')}</span>
        <span className={labelClass}>Min</span>
      </div>
      <div className={boxClass}>
        <span className={numberClass}>{String(seconds).padStart(2, '0')}</span>
        <span className={labelClass}>Sec</span>
      </div>
    </div>
  );
}

// =============================================================================
// Auction Card Component
// =============================================================================

interface AuctionCardProps {
  auction: Auction;
  nftMetadata: {
    name: string;
    image: string;
    symbol: string;
  };
  onClick: () => void;
}

function AuctionCard({ auction, nftMetadata, onClick }: AuctionCardProps) {
  const currentBid = auction.currentBid?.amount ?? auction.startingPrice;
  const isLive = auction.status === 'live';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-[#D9D9D9] cursor-pointer transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-[#FAF6F3] relative">
        <Picture
          src={nftMetadata.image}
          alt={nftMetadata.name}
          className="h-full w-full object-cover"
        />
        {isLive && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#AC463A] text-white text-xs font-bold rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-xs text-[#857F94] uppercase">{nftMetadata.symbol}</p>
        <h3 className="font-medium text-[#0A0F2E] text-lg">{nftMetadata.name}</h3>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#857F94]">
              {auction.currentBid ? 'Current Bid' : 'Starting Price'}
            </p>
            <p className="font-bold text-[#191919]">
              {currentBid.toFixed(2)} <span className="text-[#857F94]">SOL</span>
            </p>
          </div>

          <CountdownDisplay endTime={auction.endsAt} size="sm" />
        </div>

        <Button className="w-full mt-4 bg-[#191919] text-white py-2">
          {isLive ? 'Place Bid' : 'View Auction'}
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// Auction Detail Modal
// =============================================================================

interface AuctionDetailProps {
  auction: Auction;
  nftMetadata: {
    name: string;
    image: string;
    symbol: string;
    description: string;
  };
  onClose: () => void;
  onBid: (amount: number) => Promise<void>;
}

function AuctionDetail({ auction, nftMetadata, onClose, onBid }: AuctionDetailProps) {
  const { connected, account } = useWalletUi();
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentBid = auction.currentBid?.amount ?? auction.startingPrice;
  const minBid = currentBid + auction.minBidIncrement;
  const isLive = auction.status === 'live';
  const walletAddress = account?.address;
  const isHighestBidder = auction.currentBid?.bidder === walletAddress;

  async function handleBid() {
    if (!bidAmount || isSubmitting) return;

    const amount = parseFloat(bidAmount);
    if (amount < minBid) {
      alert(`Minimum bid is ${minBid.toFixed(2)} SOL`);
      return;
    }

    setIsSubmitting(true);
    await onBid(amount);
    setBidAmount('');
    setIsSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0F2E80] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D9D9D9]">
          <h2 className="font-grotesk text-xl font-medium">Live Auction</h2>
          <Button onClick={onClose} className="bg-transparent p-0">
            <img src="/img/close-outline.png" alt="Close" className="w-6" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 p-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6F3]">
              <Picture
                src={nftMetadata.image}
                alt={nftMetadata.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-4">
            <p className="text-sm text-[#857F94] uppercase">{nftMetadata.symbol}</p>
            <h1 className="font-grotesk text-2xl md:text-3xl font-medium text-[#0A0F2E]">
              {nftMetadata.name}
            </h1>
            <p className="text-[#6B7280] mt-2 text-sm">{nftMetadata.description}</p>

            {/* Timer */}
            <div className="mt-6">
              <p className="text-sm text-[#857F94] mb-2">
                {isLive ? 'Auction Ends In' : 'Auction Ended'}
              </p>
              <CountdownDisplay endTime={auction.endsAt} size="lg" />
            </div>

            {/* Current Bid */}
            <div className="mt-6 p-4 bg-[#FAF6F3] rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#857F94]">
                    {auction.currentBid ? 'Current Bid' : 'Starting Price'}
                  </p>
                  <p className="text-3xl font-bold text-[#0A0F2E]">
                    {currentBid.toFixed(2)} <span className="text-xl text-[#857F94]">SOL</span>
                  </p>
                </div>
                {auction.currentBid && (
                  <div className="text-right">
                    <p className="text-xs text-[#857F94]">Highest Bidder</p>
                    <p className="font-mono text-sm">
                      {auction.currentBid.bidder.slice(0, 4)}...
                      {auction.currentBid.bidder.slice(-4)}
                    </p>
                  </div>
                )}
              </div>

              {isHighestBidder && (
                <div className="mt-3 px-3 py-2 bg-[#40E281] text-white rounded-lg text-sm text-center">
                  🏆 You are the highest bidder!
                </div>
              )}
            </div>

            {/* Bid Form */}
            {isLive && connected && !isHighestBidder && (
              <div className="mt-4">
                <label className="block text-sm text-[#857F94] mb-2">
                  Your Bid (min: {minBid.toFixed(2)} SOL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min={minBid}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={minBid.toFixed(2)}
                    className="flex-1 px-4 py-3 border border-[#D9D9D9] rounded-xl"
                  />
                  <Button
                    onClick={handleBid}
                    disabled={isSubmitting}
                    className="bg-[#AC463A] text-white px-6 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Bidding...' : 'Place Bid'}
                  </Button>
                </div>
              </div>
            )}

            {isLive && !connected && (
              <p className="mt-4 text-center text-[#AC463A]">
                Connect your wallet to place a bid
              </p>
            )}

            {/* Bid History */}
            {auction.bids.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-[#0A0F2E] mb-2">Bid History</p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {auction.bids
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .map((bid, i) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between p-2 bg-[#FAF6F3] rounded-lg text-sm"
                      >
                        <span className="font-mono text-[#857F94]">
                          {bid.bidder.slice(0, 4)}...{bid.bidder.slice(-4)}
                        </span>
                        <span className="font-bold">{bid.amount.toFixed(2)} SOL</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Mock Data (Replace with real data from backend)
// =============================================================================

const MOCK_AUCTIONS: Array<Auction & { nftMetadata: { name: string; image: string; symbol: string; description: string } }> = [
  {
    id: 'auction-1',
    nftMint: 'mock-mint-1',
    seller: 'seller-1',
    startingPrice: 5,
    reservePrice: 10,
    currentBid: {
      id: 'bid-1',
      auctionId: 'auction-1',
      bidder: '8Gwd...DQrh',
      amount: 7.5,
      timestamp: new Date(Date.now() - 3600000),
      signature: 'sig-1',
    },
    bids: [],
    status: 'live',
    startsAt: new Date(Date.now() - 86400000),
    endsAt: new Date(Date.now() + 3600000 * 5), // 5 hours from now
    minBidIncrement: 0.5,
    extensionTime: 300,
    nftMetadata: {
      name: 'Solana Monkey #1234',
      image: '/img/collection-item-1.png',
      symbol: 'SMB',
      description: 'A rare Solana Monkey from the Genesis collection.',
    },
  },
  {
    id: 'auction-2',
    nftMint: 'mock-mint-2',
    seller: 'seller-2',
    startingPrice: 15,
    currentBid: undefined,
    bids: [],
    status: 'live',
    startsAt: new Date(Date.now() - 43200000),
    endsAt: new Date(Date.now() + 86400000), // 24 hours from now
    minBidIncrement: 1,
    extensionTime: 300,
    nftMetadata: {
      name: 'Mad Lad #5678',
      image: '/img/collection-item-2.png',
      symbol: 'MAD',
      description: 'An exclusive Mad Lad xNFT.',
    },
  },
  {
    id: 'auction-3',
    nftMint: 'mock-mint-3',
    seller: 'seller-3',
    startingPrice: 2,
    currentBid: {
      id: 'bid-3',
      auctionId: 'auction-3',
      bidder: '9R4R...Ym8Q',
      amount: 4.2,
      timestamp: new Date(Date.now() - 7200000),
      signature: 'sig-3',
    },
    bids: [],
    status: 'live',
    startsAt: new Date(Date.now() - 172800000),
    endsAt: new Date(Date.now() + 1800000), // 30 minutes from now
    minBidIncrement: 0.25,
    extensionTime: 180,
    nftMetadata: {
      name: 'Claynosaurz #9012',
      image: '/img/collection-item-3.png',
      symbol: 'CLAY',
      description: 'A vibrant Claynosaurz dinosaur.',
    },
  },
];

// =============================================================================
// Main Page Component
// =============================================================================

export default function LiveAuctionsPage() {
  const [auctions, setAuctions] = useState(MOCK_AUCTIONS);
  const [selectedAuction, setSelectedAuction] = useState<typeof MOCK_AUCTIONS[number] | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'ended'>('all');

  const filteredAuctions = auctions.filter((a) => {
    if (filter === 'live') return a.status === 'live';
    if (filter === 'ended') return a.status === 'ended' || a.status === 'settled';
    return true;
  });

  async function handleBid(auctionId: string, amount: number) {
    // TODO: Implement actual bidding via Solana transaction
    console.log('Placing bid:', { auctionId, amount });
    alert('Bid placed! (Note: This is a demo - real bids require on-chain transaction)');
  }

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Hero */}
      <SectionWrapper className="pt-24 pb-8 md:pt-32 md:pb-12 bg-[#0A0F2E] text-white">
        <h1 className="font-grotesk text-4xl md:text-5xl font-medium mb-4">Live Auctions</h1>
        <p className="text-[#A0AEC0] max-w-2xl">
          Bid on exclusive NFTs in real-time. Our timer-based auctions ensure fair competition — no
          instant liquidity, no bid farming. May the best bidder win.
        </p>
      </SectionWrapper>

      {/* Filters */}
      <SectionWrapper className="py-6">
        <div className="flex items-center gap-4">
          <span className="text-[#6B7280]">Filter:</span>
          {(['all', 'live', 'ended'] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              className={twMerge(
                'px-4 py-2 rounded-full capitalize',
                filter === f
                  ? 'bg-[#191919] text-white'
                  : 'bg-white text-[#6B7280] border border-[#D9D9D9]'
              )}
            >
              {f}
            </Button>
          ))}
        </div>
      </SectionWrapper>

      {/* Auctions Grid */}
      <SectionWrapper className="pb-12">
        {filteredAuctions.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-6xl mb-4">🔨</div>
            <h3 className="text-xl font-medium text-[#0A0F2E] mb-2">No Auctions Found</h3>
            <p className="text-[#6B7280]">Check back soon for new live auctions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                nftMetadata={auction.nftMetadata}
                onClick={() => setSelectedAuction(auction)}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Auction Detail Modal */}
      {selectedAuction && (
        <AuctionDetail
          auction={selectedAuction}
          nftMetadata={selectedAuction.nftMetadata}
          onClose={() => setSelectedAuction(null)}
          onBid={(amount) => handleBid(selectedAuction.id, amount)}
        />
      )}
    </main>
  );
}
