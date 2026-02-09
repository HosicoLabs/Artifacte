'use client';

/**
 * NFT Detail View Component
 *
 * Shows full NFT details with:
 * - Buy Now (fixed price) - NO instant sell or bid liquidity
 * - Individual offers list
 * - Make offer form
 * - Traits, activity, details tabs
 */

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/comps/primitive/Button';
import { Table, TableRow } from '@/comps/primitive/Table';
import Picture from '@/comps/primitive/Picture';
import type { NFT, Listing, Offer, Activity } from '@/lib/types';

// =============================================================================
// Sub-components
// =============================================================================

interface TraitsListProps {
  attributes: NFT['metadata']['attributes'];
}

function TraitsList({ attributes }: TraitsListProps) {
  if (attributes.length === 0) {
    return <p className="text-[#857F94] text-sm">No traits available</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {attributes.map((attr, i) => (
        <div
          key={i}
          className="px-4 py-3 rounded-xl bg-[#fafafa] border border-[#d9d9d9]"
        >
          <p className="text-xs text-[#857F94] uppercase">{attr.traitType}</p>
          <p className="font-medium text-[#191919] capitalize">{attr.value}</p>
          {attr.rarity !== undefined && (
            <p className="text-xs text-[#857F94]">{attr.rarity.toFixed(1)}% have this</p>
          )}
        </div>
      ))}
    </div>
  );
}

interface OffersListProps {
  offers: Offer[];
  isOwner: boolean;
  onAcceptOffer?: (offerId: string) => void;
}

function OffersList({ offers, isOwner, onAcceptOffer }: OffersListProps) {
  if (offers.length === 0) {
    return (
      <div className="px-4 py-6 rounded-2xl bg-[#fafafa] border border-[#d9d9d9] text-center">
        <p className="text-[#857F94]">No offers yet</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 rounded-2xl bg-[#fafafa] border border-[#d9d9d9]">
      <Table>
        {{
          headers: (
            <TableRow>
              {['Price', 'From', 'Expires', isOwner ? 'Action' : ''].map((el, i) => (
                <p key={i} className="font-inter capitalize text-sm text-[#857F94]">
                  {el}
                </p>
              ))}
            </TableRow>
          ),
          body: offers.map((offer, i) => {
            const expiresIn = Math.max(
              0,
              Math.floor((offer.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))
            );

            return (
              <TableRow key={i}>
                <p className="font-bold text-[#191919]">
                  {offer.amount.toFixed(2)} <span className="text-[#857F94]">SOL</span>
                </p>
                <p className="text-[#857F94] font-mono">
                  {offer.buyer.slice(0, 4)}...{offer.buyer.slice(-4)}
                </p>
                <p className="text-[#857F94]">{expiresIn}h</p>
                {isOwner && (
                  <Button
                    onClick={() => onAcceptOffer?.(offer.id)}
                    className="bg-[#40E281] text-white text-xs px-3 py-1"
                  >
                    Accept
                  </Button>
                )}
              </TableRow>
            );
          }),
        }}
      </Table>
    </div>
  );
}

interface ActivityListProps {
  activities: Activity[];
}

function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="px-4 py-6 rounded-2xl bg-[#fafafa] border border-[#d9d9d9] text-center">
        <p className="text-[#857F94]">No activity yet</p>
      </div>
    );
  }

  const getActivityColor = (type: Activity['type']): string => {
    switch (type) {
      case 'listing':
        return 'text-[#FF99A1]';
      case 'sale':
        return 'text-[#41E78A]';
      case 'offer':
      case 'offer_accepted':
        return 'text-[#FFC629]';
      default:
        return 'text-[#857F94]';
    }
  };

  return (
    <div className="px-4 py-6 rounded-2xl bg-[#fafafa] border border-[#d9d9d9]">
      <Table>
        {{
          headers: (
            <TableRow>
              {['Type', 'From', 'To', 'Price', 'Time'].map((el, i) => (
                <p key={i} className="font-inter capitalize text-sm text-[#857F94]">
                  {el}
                </p>
              ))}
            </TableRow>
          ),
          body: activities.map((activity, i) => (
            <TableRow key={i}>
              <p className={twMerge('font-bold capitalize', getActivityColor(activity.type))}>
                {activity.type.replace('_', ' ')}
              </p>
              <p className="text-[#857F94] font-mono">
                {activity.from.slice(0, 4)}...{activity.from.slice(-4)}
              </p>
              <p className="text-[#857F94] font-mono">
                {activity.to ? `${activity.to.slice(0, 4)}...${activity.to.slice(-4)}` : '-'}
              </p>
              <p className="text-[#857F94]">
                {activity.price ? `${activity.price.toFixed(2)} SOL` : '-'}
              </p>
              <p className="text-[#857F94]">
                {new Date(activity.timestamp).toLocaleDateString()}
              </p>
            </TableRow>
          )),
        }}
      </Table>
    </div>
  );
}

interface DetailsTableProps {
  nft: NFT;
}

function DetailsTable({ nft }: DetailsTableProps) {
  const details = [
    { label: 'Mint', value: `${nft.mint.slice(0, 4)}...${nft.mint.slice(-4)}`, full: nft.mint },
    { label: 'Owner', value: `${nft.owner.slice(0, 4)}...${nft.owner.slice(-4)}`, full: nft.owner },
    {
      label: 'Collection',
      value: `${nft.collectionAddress.slice(0, 4)}...${nft.collectionAddress.slice(-4)}`,
      full: nft.collectionAddress,
    },
    { label: 'Token Standard', value: nft.tokenStandard },
  ];

  return (
    <div className="px-4 py-6 rounded-2xl bg-[#fafafa] border border-[#d9d9d9]">
      <ul className="flex flex-col gap-3">
        {details.map((item, i) => (
          <li key={i} className="flex items-center justify-between">
            <p className="font-inter capitalize text-sm text-[#857F94]">{item.label}</p>
            <p
              className="font-inter text-sm text-[#111] font-mono cursor-pointer hover:text-[#AC463A]"
              title={item.full}
            >
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================================
// Make Offer Form
// =============================================================================

interface MakeOfferFormProps {
  nftMint: string;
  onSubmit: (amount: number, expiresInHours: number) => Promise<void>;
  disabled?: boolean;
}

function MakeOfferForm({ nftMint, onSubmit, disabled }: MakeOfferFormProps) {
  const [amount, setAmount] = useState('');
  const [expiry, setExpiry] = useState('24');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(parseFloat(amount), parseInt(expiry, 10));
    setAmount('');
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 rounded-xl bg-[#fafafa] border border-[#d9d9d9]">
      <p className="font-medium text-[#0A0F2E] mb-3">Make an Offer</p>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-[#857F94] block mb-1">Amount (SOL)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            className="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg bg-white disabled:bg-gray-100"
          />
        </div>

        <div className="w-32">
          <label className="text-xs text-[#857F94] block mb-1">Expires in</label>
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg bg-white disabled:bg-gray-100"
          >
            <option value="1">1 hour</option>
            <option value="6">6 hours</option>
            <option value="24">24 hours</option>
            <option value="72">3 days</option>
            <option value="168">7 days</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={disabled || isSubmitting || !amount}
        className="w-full mt-3 bg-[#AC463A] text-white py-2.5 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Offer'}
      </Button>
    </form>
  );
}

// =============================================================================
// Main Component
// =============================================================================

type TabType = 'traits' | 'offers' | 'activity' | 'details';

interface NFTDetailViewProps {
  nft: NFT;
  listing?: Listing;
  offers: Offer[];
  activities: Activity[];
  isOwner: boolean;
  isConnected: boolean;
  onBuyNow?: () => Promise<void>;
  onMakeOffer?: (amount: number, expiresInHours: number) => Promise<void>;
  onAcceptOffer?: (offerId: string) => Promise<void>;
  onClose?: () => void;
}

export default function NFTDetailView({
  nft,
  listing,
  offers,
  activities,
  isOwner,
  isConnected,
  onBuyNow,
  onMakeOffer,
  onAcceptOffer,
  onClose,
}: NFTDetailViewProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('traits');
  const [isBuying, setIsBuying] = useState(false);

  const isListed = listing?.status === 'active';
  const highestOffer = offers.length > 0 ? Math.max(...offers.map((o) => o.amount)) : null;

  async function handleBuyNow() {
    if (!onBuyNow || isBuying) return;
    setIsBuying(true);
    await onBuyNow();
    setIsBuying(false);
  }

  const tabs: TabType[] = ['traits', 'offers', 'activity', 'details'];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-0">
      {/* NFT Image */}
      <div className="md:w-1/2">
        <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF6F3]">
          <Picture
            src={nft.metadata.image}
            alt={nft.metadata.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* NFT Details */}
      <div className="md:w-1/2">
        {/* Close button (for modal use) */}
        {onClose && (
          <Button className="hidden md:block bg-transparent p-0 ml-auto mb-2" onClick={onClose}>
            <img className="w-5.5" src="/img/close-outline.png" alt="Close" />
          </Button>
        )}

        {/* Title & Collection */}
        <div className="mb-4">
          <p className="text-sm text-[#857F94] uppercase tracking-wide">{nft.metadata.symbol}</p>
          <h1 className="font-grotesk font-medium text-3xl md:text-4xl text-[#0A0F2E]">
            {nft.metadata.name}
          </h1>
          <p className="text-[#6B7280] mt-1">
            Owned by:{' '}
            <span className="text-[#0A0F2E] font-mono">
              {nft.owner.slice(0, 4)}...{nft.owner.slice(-4)}
            </span>
          </p>
        </div>

        {/* Price Section - Fixed price only, NO bid liquidity */}
        <div className="border-t border-[#d9d9d9] pt-4 mb-4">
          {isListed ? (
            <>
              <p className="text-4xl font-medium text-[#0A0F2E]">
                {listing.price.toFixed(2)}{' '}
                <span className="text-2xl uppercase text-[#857F94]">SOL</span>
              </p>

              {/* Buy Now button - only if listed and not owner */}
              {!isOwner && isConnected && (
                <Button
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className="w-full bg-[#191919] text-white py-3 mt-4 disabled:opacity-50"
                >
                  {isBuying ? 'Processing...' : 'Buy Now'}
                </Button>
              )}
            </>
          ) : (
            <p className="text-xl text-[#6B7280]">Not currently listed</p>
          )}

          {!isConnected && (
            <p className="text-sm text-[#AC463A] mt-2">Connect wallet to buy or make offers</p>
          )}
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 p-3 rounded-lg border border-[#d5d0e1] text-center">
            <p className="text-xs text-[#857F94] capitalize">List Price</p>
            <p className="font-bold text-[#191919]">
              {isListed ? `${listing.price.toFixed(2)} SOL` : '-'}
            </p>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-[#d5d0e1] text-center">
            <p className="text-xs text-[#857F94] capitalize">Top Offer</p>
            <p className="font-bold text-[#191919]">
              {highestOffer ? `${highestOffer.toFixed(2)} SOL` : '-'}
            </p>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-[#d5d0e1] text-center">
            <p className="text-xs text-[#857F94] capitalize">Offers</p>
            <p className="font-bold text-[#191919]">{offers.length}</p>
          </div>
        </div>

        {/* Make Offer form - only if connected and not owner */}
        {isConnected && !isOwner && onMakeOffer && (
          <MakeOfferForm nftMint={nft.mint} onSubmit={onMakeOffer} disabled={!isConnected} />
        )}

        {/* Tabs */}
        <div className="mt-6 overflow-y-auto max-h-80">
          <ul className="flex items-center justify-between mb-4 border-b border-[#d9d9d9]">
            {tabs.map((tab) => (
              <li key={tab}>
                <Button
                  onClick={() => setSelectedTab(tab)}
                  className={twMerge(
                    'bg-transparent px-2 pb-2 capitalize',
                    selectedTab === tab
                      ? 'text-[#191919] font-medium border-b-2 border-[#191919]'
                      : 'text-[#857F94]'
                  )}
                >
                  {tab}
                </Button>
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          <div>
            {selectedTab === 'traits' && <TraitsList attributes={nft.metadata.attributes} />}
            {selectedTab === 'offers' && (
              <OffersList offers={offers} isOwner={isOwner} onAcceptOffer={onAcceptOffer} />
            )}
            {selectedTab === 'activity' && <ActivityList activities={activities} />}
            {selectedTab === 'details' && <DetailsTable nft={nft} />}
          </div>
        </div>
      </div>
    </div>
  );
}
