'use client';

import { useState } from 'react';
import InvestorProfileHeader from '@/comps/ui/Dashboard/InvestorProfileHeader';
import InstitutionalAssets from '@/comps/ui/Dashboard/InstitutionalAssets';
import LiveAuctions from '@/comps/ui/Dashboard/LiveAuctions';
import RecentRWAListings from '@/comps/ui/Dashboard/RecentRWAListings';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="pt-[60px] md:pt-[72px]">
      <InvestorProfileHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <InstitutionalAssets searchQuery={searchQuery} />
      <LiveAuctions searchQuery={searchQuery} />
      <RecentRWAListings searchQuery={searchQuery} />
    </main>
  );
}
