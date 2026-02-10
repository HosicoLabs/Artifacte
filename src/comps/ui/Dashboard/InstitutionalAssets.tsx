'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import SectionWrapper from '@/comps/primitive/SectionWrapper';
import Button from '@/comps/primitive/Button';
import { RWAAsset, RWACategory } from '@/lib/types';
import { institutionalAssets, categoryLabels, rwaAuctions } from '@/lib/rwa-data';

interface InstitutionalAssetsProps {
  searchQuery: string;
}

function AssetCard({ asset }: { asset: RWAAsset }) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryBadge = (category: RWACategory): string => {
    const badges: Record<RWACategory, string> = {
      'real-estate': 'REAL ESTATE',
      'digital-art': 'DIGITAL ART',
      'agriculture': 'AGRICULTURE',
      'aviation': 'AVIATION',
      'precious-metals': 'PRECIOUS METALS',
    };
    return badges[category];
  };

  const getAuctionLink = (): string => {
    const matchingAuction = rwaAuctions.find((auction) => auction.category === asset.category);
    return `/auctions/${matchingAuction?.id || rwaAuctions[0]?.id || 'master-ultra-thin-calendar'}`;
  };

  return (
    <Link href={getAuctionLink()} className="block group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-4/3 bg-[#FAF6F3]">
        <img
          src={asset.image}
          alt={asset.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-3 left-3">
          <div className="bg-[#191919] text-white text-[10px] md:text-[11px] font-medium px-3 py-1 rounded-full uppercase">
            {getCategoryBadge(asset.category)}
          </div>
        </div>

        {asset.sharesSold / asset.totalShares > 0.7 && (
          <div className="absolute top-3 right-3">
            <div className="bg-[#191919] text-white text-[10px] md:text-[11px] font-medium px-3 py-1 rounded-full uppercase">
              High Demand
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-[16px] md:text-[18px] font-medium mb-1 group-hover:text-[#191919] transition-colors">
          {asset.name}
        </h3>
        <p className="text-[12px] md:text-[14px] text-[#6C737F] mb-3">
          {asset.fractionalOwnership ? 'Fractional ownership available' : asset.assetType}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-[18px] md:text-[20px] font-bold">
            {formatPrice(asset.sharePrice)}
          </span>
          <span className="text-[12px] md:text-[14px] text-[#6C737F]">/ Share</span>
        </div>
      </div>
    </Link>
  );
}

export default function InstitutionalAssets({ searchQuery }: InstitutionalAssetsProps) {
  const [selectedCategory, setSelectedCategory] = useState<RWACategory | 'all'>('all');

  const filteredAssets = useMemo(() => {
    let assets = institutionalAssets;

    if (selectedCategory !== 'all') {
      assets = assets.filter((asset) => asset.category === selectedCategory);
    }

    if (searchQuery?.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      assets = assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(lowerQuery) ||
          asset.assetType.toLowerCase().includes(lowerQuery) ||
          asset.description?.toLowerCase().includes(lowerQuery)
      );
    }

    return assets;
  }, [selectedCategory, searchQuery]);

  const categories: Array<RWACategory | 'all'> = [
    'all',
    'real-estate',
    'digital-art',
    'agriculture',
    'aviation',
    'precious-metals',
  ];

  return (
    <SectionWrapper className="bg-[#FAF6F3]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] md:text-[32px] font-philosopher font-bold">
          Institutional Assets
        </h2>
        <button className="text-[#191919] text-[14px] md:text-[16px] font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={twMerge(
              'px-4 py-2 text-[12px] md:text-[14px] capitalize transition-colors',
              selectedCategory === category
                ? 'bg-[#191919] text-white'
                : 'bg-white text-[#6B7280] border border-[#D9D9D9] hover:border-[#191919]'
            )}
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>

      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredAssets.slice(0, 8).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#6C737F] text-[14px] md:text-[16px]">
            No assets found matching your criteria
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
