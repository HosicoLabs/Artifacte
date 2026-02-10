'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RWAAuction } from '@/lib/types';
import RWAAuctionDetailView from '@/comps/ui/Auction/RWAAuctionDetailView';

interface RWAAuctionClientProps {
  auction: RWAAuction;
}

export default function RWAAuctionClient({ auction }: RWAAuctionClientProps) {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <div className="bg-[#191919] px-6 py-4">
        <div className="max-w-480 mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              href="/" 
              className="text-[#D9D9D9] hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-[#6B7280]">/</span>
            <Link 
              href="/auctions" 
              className="text-[#D9D9D9] hover:text-white transition-colors"
            >
              Auctions
            </Link>
            <span className="text-[#6B7280]">/</span>
            <span className="text-white">{auction.name}</span>
          </nav>
        </div>
      </div>

      <RWAAuctionDetailView auction={auction} />
    </main>
  );
}
