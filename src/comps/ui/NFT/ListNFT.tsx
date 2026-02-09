'use client';

/**
 * List NFT Form Component
 *
 * Allows users to list their NFTs at a FIXED PRICE
 * NO instant sell, NO bid liquidity, NO pooled bids
 *
 * Only NFTs from whitelisted collections can be listed
 */

import { useState } from 'react';
import { useWalletUi } from '@wallet-ui/react';
import { twMerge } from 'tailwind-merge';
import Button from '@/comps/primitive/Button';
import Picture from '@/comps/primitive/Picture';
import { createListing, cancelListing, getListing } from '@/lib/nft-service';
import { validateNFTCollection } from '@/lib/whitelist';
import type { NFT, Listing } from '@/lib/types';

// =============================================================================
// List Form for unlisted NFT
// =============================================================================

interface ListNFTFormProps {
  nft: NFT;
  onListingCreated: (listing: Listing) => void;
}

function ListNFTForm({ nft, onListingCreated }: ListNFTFormProps) {
  const { account } = useWalletUi();
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const walletAddress = account?.address;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!price || isSubmitting || !walletAddress) return;

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // Verify NFT is from whitelisted collection
    const collection = validateNFTCollection(nft.collectionAddress);
    if (!collection) {
      setError('This NFT is not from a whitelisted collection');
      return;
    }

    // Verify user owns the NFT
    if (nft.owner !== walletAddress) {
      setError('You do not own this NFT');
      return;
    }

    setIsSubmitting(true);

    const listing = await createListing(nft.mint, walletAddress, priceNum);

    if (listing) {
      onListingCreated(listing);
    } else {
      setError('Failed to create listing. Please try again.');
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#0A0F2E] mb-2">
          Set Your Price (SOL)
        </label>
        <p className="text-xs text-[#857F94] mb-3">
          Your NFT will be listed at this fixed price. Buyers can either purchase at this price or
          make individual offers.
        </p>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-[#D9D9D9] rounded-xl bg-white text-lg pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#857F94] font-medium">
            SOL
          </span>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="bg-[#FAF6F3] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#857F94]">Platform Fee</span>
          <span className="text-[#0A0F2E]">2.5%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#857F94]">Creator Royalty</span>
          <span className="text-[#0A0F2E]">~5%</span>
        </div>
        <div className="border-t border-[#D9D9D9] pt-2 flex justify-between">
          <span className="font-medium text-[#0A0F2E]">You Receive</span>
          <span className="font-bold text-[#0A0F2E]">
            {price ? (parseFloat(price) * 0.925).toFixed(2) : '0.00'} SOL
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !price}
        className="w-full bg-[#191919] text-white py-3 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Listing...' : 'List for Sale'}
      </Button>

      <p className="text-xs text-[#857F94] text-center">
        No bid liquidity • No instant sell • Fixed price only
      </p>
    </form>
  );
}

// =============================================================================
// Active Listing View
// =============================================================================

interface ActiveListingViewProps {
  nft: NFT;
  listing: Listing;
  onListingCancelled: () => void;
}

function ActiveListingView({ nft, listing, onListingCancelled }: ActiveListingViewProps) {
  const { account } = useWalletUi();
  const [isCancelling, setIsCancelling] = useState(false);

  const walletAddress = account?.address;

  async function handleCancel() {
    if (!walletAddress || isCancelling) return;

    setIsCancelling(true);
    const success = cancelListing(nft.mint, walletAddress);

    if (success) {
      onListingCancelled();
    } else {
      alert('Failed to cancel listing');
    }

    setIsCancelling(false);
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#E8F5E9] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#40E281] rounded-full flex items-center justify-center">
          <span className="text-white">✓</span>
        </div>
        <div>
          <p className="font-medium text-[#0A0F2E]">Listed for Sale</p>
          <p className="text-sm text-[#6B7280]">
            Your NFT is listed at {listing.price.toFixed(2)} SOL
          </p>
        </div>
      </div>

      <div className="bg-[#FAF6F3] rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-[#857F94]">Listed Price</span>
          <span className="font-bold text-[#0A0F2E]">{listing.price.toFixed(2)} SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#857F94]">Listed On</span>
          <span className="text-[#0A0F2E]">{new Date(listing.createdAt).toLocaleDateString()}</span>
        </div>
        {listing.expiresAt && (
          <div className="flex justify-between">
            <span className="text-[#857F94]">Expires</span>
            <span className="text-[#0A0F2E]">
              {new Date(listing.expiresAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleCancel}
          disabled={isCancelling}
          className="flex-1 bg-white text-[#AC463A] border border-[#AC463A] py-3 disabled:opacity-50"
        >
          {isCancelling ? 'Cancelling...' : 'Cancel Listing'}
        </Button>
        <Button className="flex-1 bg-[#191919] text-white py-3">Edit Price</Button>
      </div>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

interface ListNFTProps {
  nft: NFT;
  className?: string;
}

export default function ListNFT({ nft, className }: ListNFTProps) {
  const { connected, account } = useWalletUi();
  const [listing, setListing] = useState<Listing | undefined>(getListing(nft.mint));

  const walletAddress = account?.address;
  const isOwner = nft.owner === walletAddress;

  // Check if NFT is from whitelisted collection
  const collection = validateNFTCollection(nft.collectionAddress);

  if (!connected) {
    return (
      <div className={twMerge('p-6 bg-white rounded-2xl', className)}>
        <p className="text-center text-[#6B7280]">Connect your wallet to list this NFT</p>
      </div>
    );
  }

  if (!isOwner) {
    return null;
  }

  if (!collection) {
    return (
      <div className={twMerge('p-6 bg-white rounded-2xl', className)}>
        <div className="text-center">
          <div className="text-4xl mb-3">🚫</div>
          <p className="font-medium text-[#0A0F2E]">Cannot List This NFT</p>
          <p className="text-sm text-[#6B7280] mt-1">
            This NFT is not from a whitelisted collection and cannot be listed on Artifacte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge('p-6 bg-white rounded-2xl', className)}>
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#D9D9D9]">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF6F3]">
          <Picture
            src={nft.metadata.image}
            alt={nft.metadata.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs text-[#857F94] uppercase">{collection.name}</p>
          <h3 className="font-medium text-[#0A0F2E]">{nft.metadata.name}</h3>
        </div>
      </div>

      {listing?.status === 'active' ? (
        <ActiveListingView
          nft={nft}
          listing={listing}
          onListingCancelled={() => setListing(undefined)}
        />
      ) : (
        <ListNFTForm nft={nft} onListingCreated={(newListing) => setListing(newListing)} />
      )}
    </div>
  );
}
