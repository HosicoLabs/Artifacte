'use client';

/**
 * Individual NFT Detail Page
 *
 * Dynamic route: /collections/[mint]
 * Displays full NFT details with Buy Now and individual offers
 * NO bid liquidity - NO "sell now" or pooled bids
 */

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useWalletUi } from '@wallet-ui/react';
import Button from '@/comps/primitive/Button';
import NFTDetailView from '@/comps/ui/NFT/NFTDetailView';
import { getNFTByMint, getOffersForNFT, createOffer, acceptOffer, getListing } from '@/lib/nft-service';
import { getWhitelistedCollection } from '@/lib/whitelist';
import type { NFT, Offer, Activity, Listing } from '@/lib/types';

interface NFTPageClientProps {
  mint: string;
}

export default function NFTPageClient({ mint }: NFTPageClientProps) {
  const { account, connected } = useWalletUi();

  const [nft, setNFT] = useState<NFT | null>(null);
  const [listing, setListing] = useState<Listing | undefined>();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const walletAddress = account?.address ?? null;
  const isOwner = nft?.owner === walletAddress;

  // Fetch NFT data
  const fetchNFTData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const fetchedNFT = await getNFTByMint(mint);

    if (!fetchedNFT) {
      setError('NFT not found or not from a whitelisted collection');
      setIsLoading(false);
      return;
    }

    // Verify collection is whitelisted
    const collection = getWhitelistedCollection(fetchedNFT.collectionAddress);
    if (!collection) {
      setError('This NFT is not from a whitelisted collection');
      setIsLoading(false);
      return;
    }

    setNFT(fetchedNFT);
    setListing(getListing(mint));
    setOffers(getOffersForNFT(mint));

    // TODO: Fetch real activity from indexer
    setActivities([]);

    setIsLoading(false);
  }, [mint]);

  useEffect(() => {
    fetchNFTData();
  }, [fetchNFTData]);

  // Handle Buy Now
  async function handleBuyNow() {
    if (!listing || !walletAddress) return;

    // TODO: Implement actual Solana transaction
    // 1. Create transaction to transfer SOL from buyer to seller
    // 2. Transfer NFT from seller to buyer
    // 3. Use escrow or atomic swap for safety

    console.log('Buy Now:', { nft: mint, price: listing.price, buyer: walletAddress });
    alert('Buy transaction not yet implemented. Connect to Solana program.');
  }

  // Handle Make Offer
  async function handleMakeOffer(amount: number, expiresInHours: number) {
    if (!walletAddress) return;

    const offer = await createOffer(mint, walletAddress, amount, expiresInHours);

    if (offer) {
      setOffers(getOffersForNFT(mint));
      alert('Offer submitted! (Note: This is a demo - real offers require on-chain escrow)');
    } else {
      alert('Failed to create offer');
    }
  }

  // Handle Accept Offer (owner only)
  async function handleAcceptOffer(offerId: string) {
    if (!walletAddress || !isOwner) return;

    // TODO: Implement actual Solana transaction
    const success = acceptOffer(offerId, walletAddress);

    if (success) {
      setOffers(getOffersForNFT(mint));
      alert('Offer accepted! (Note: This is a demo - real acceptance requires on-chain transaction)');
    } else {
      alert('Failed to accept offer');
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF6F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#AC463A] border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-[#6B7280]">Loading NFT...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !nft) {
    return (
      <main className="min-h-screen bg-[#FAF6F3] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-[#0A0F2E] mb-2">NFT Not Found</h1>
          <p className="text-[#6B7280] mb-6">{error ?? 'This NFT does not exist or is not available on our platform.'}</p>
          <Link href="/collections">
            <Button className="bg-[#191919] text-white">Browse Collections</Button>
          </Link>
        </div>
      </main>
    );
  }

  const collection = getWhitelistedCollection(nft.collectionAddress);

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#857F94]">
          <Link href="/collections" className="hover:text-[#0A0F2E]">
            Collections
          </Link>
          <span>/</span>
          {collection && (
            <>
              <Link
                href={`/collections?collection=${nft.collectionAddress}`}
                className="hover:text-[#0A0F2E]"
              >
                {collection.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#0A0F2E]">{nft.metadata.name}</span>
        </nav>
      </div>

      {/* NFT Detail */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <NFTDetailView
            nft={nft}
            listing={listing}
            offers={offers}
            activities={activities}
            isOwner={isOwner}
            isConnected={connected}
            onBuyNow={handleBuyNow}
            onMakeOffer={handleMakeOffer}
            onAcceptOffer={handleAcceptOffer}
          />
        </div>

        {/* Collection Info */}
        {collection && (
          <div className="mt-8 p-6 bg-white rounded-2xl">
            <h2 className="font-grotesk text-xl font-medium text-[#0A0F2E] mb-4">
              About {collection.name}
            </h2>
            <p className="text-[#6B7280]">{collection.description}</p>
            <div className="flex gap-4 mt-4">
              {collection.website && (
                <a
                  href={collection.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#AC463A] hover:underline text-sm"
                >
                  Website →
                </a>
              )}
              {collection.twitter && (
                <a
                  href={`https://twitter.com/${collection.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#AC463A] hover:underline text-sm"
                >
                  Twitter →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
