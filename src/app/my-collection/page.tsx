'use client';

/**
 * My Collection Page
 *
 * Shows the user's NFTs from whitelisted collections
 * Allows listing NFTs at fixed prices (NO instant sell, NO bid liquidity)
 */

import { useEffect, useState, useCallback } from 'react';
import { useWalletUi } from '@wallet-ui/react';
import Button from '@/comps/primitive/Button';
import SectionWrapper from '@/comps/primitive/SectionWrapper';
import { NFTCard, ListNFT } from '@/comps/ui/NFT';
import { getNFTsByOwner, getListing } from '@/lib/nft-service';
import type { NFT, Listing } from '@/lib/types';

export default function MyCollectionPage() {
  const { connected, account } = useWalletUi();
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [listings, setListings] = useState<Map<string, Listing>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const walletAddress = account?.address;

  // Fetch user's NFTs
  const fetchMyNFTs = useCallback(async () => {
    if (!walletAddress) return;

    setIsLoading(true);

    const result = await getNFTsByOwner(walletAddress);
    setNFTs(result.items);

    // Build listings map
    const listingsMap = new Map<string, Listing>();
    for (const nft of result.items) {
      const listing = getListing(nft.mint);
      if (listing) {
        listingsMap.set(nft.mint, listing);
      }
    }
    setListings(listingsMap);

    setIsLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    if (connected && walletAddress) {
      fetchMyNFTs();
    }
  }, [connected, walletAddress, fetchMyNFTs]);

  // Not connected state
  if (!connected) {
    return (
      <main className="min-h-screen bg-[#FAF6F3]">
        <SectionWrapper className="py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="font-grotesk text-3xl font-medium text-[#0A0F2E] mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-[#6B7280] mb-6">
              Connect your Solana wallet to view your NFTs and list them for sale on Artifacte.
            </p>
            <p className="text-sm text-[#857F94]">
              Only NFTs from whitelisted collections can be listed.
            </p>
          </div>
        </SectionWrapper>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Header */}
      <SectionWrapper className="pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-grotesk text-3xl md:text-4xl font-medium text-[#0A0F2E]">
              My Collection
            </h1>
            <p className="text-[#6B7280] mt-2">
              Manage and list your NFTs from whitelisted collections
            </p>
          </div>
          <Button onClick={fetchMyNFTs} className="bg-white border border-[#D9D9D9]">
            <img src="/img/refresh.png" alt="Refresh" className="w-5 h-5 mr-2" />
            Refresh
          </Button>
        </div>
      </SectionWrapper>

      {/* Content */}
      <SectionWrapper className="pb-12">
        <div className="flex gap-8">
          {/* NFT Grid */}
          <div className="flex-1">
            {isLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-[#E5E5E5] animate-pulse"
                  />
                ))}
              </div>
            )}

            {!isLoading && nfts.length === 0 && (
              <div className="py-16 text-center bg-white rounded-2xl">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-medium text-[#0A0F2E] mb-2">No NFTs Found</h3>
                <p className="text-[#6B7280] max-w-md mx-auto">
                  You don't have any NFTs from whitelisted collections in your wallet. Purchase NFTs
                  from our collections page or wait for new collections to be added.
                </p>
              </div>
            )}

            {!isLoading && nfts.length > 0 && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[#6B7280]">{nfts.length} NFTs from whitelisted collections</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {nfts.map((nft) => {
                    const listing = listings.get(nft.mint);
                    const isSelected = selectedNFT?.mint === nft.mint;

                    return (
                      <div
                        key={nft.mint}
                        className={`cursor-pointer rounded-2xl transition-all ${
                          isSelected ? 'ring-2 ring-[#AC463A]' : ''
                        }`}
                        onClick={() => setSelectedNFT(nft)}
                      >
                        <NFTCard nft={nft} listing={listing} showCollection />
                        {listing?.status === 'active' && (
                          <div className="mt-2 px-3 py-1 bg-[#40E281] text-white text-xs text-center rounded-full">
                            Listed at {listing.price.toFixed(2)} SOL
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Listing Panel */}
          <div className="hidden lg:block w-96">
            <div className="sticky top-24">
              {selectedNFT ? (
                <ListNFT nft={selectedNFT} />
              ) : (
                <div className="p-6 bg-white rounded-2xl text-center">
                  <div className="text-4xl mb-3">👆</div>
                  <p className="text-[#6B7280]">Select an NFT to list it for sale</p>
                  <p className="text-xs text-[#857F94] mt-2">
                    Fixed price only • No instant sell • No bid liquidity
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Listing Panel */}
        {selectedNFT && (
          <div className="lg:hidden fixed inset-0 bg-[#0A0F2E40] z-50 flex items-end">
            <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">List NFT</h3>
                <Button
                  onClick={() => setSelectedNFT(null)}
                  className="bg-transparent p-0"
                >
                  <img src="/img/close-outline.png" alt="Close" className="w-6" />
                </Button>
              </div>
              <ListNFT nft={selectedNFT} />
            </div>
          </div>
        )}
      </SectionWrapper>
    </main>
  );
}
