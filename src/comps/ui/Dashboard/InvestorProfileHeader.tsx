'use client';

import { useWalletUi } from '@wallet-ui/react';

interface InvestorProfileHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function InvestorProfileHeader({
  searchQuery,
  onSearchChange,
}: InvestorProfileHeaderProps) {
  const { account } = useWalletUi();

  const truncatedAddress = account?.address
    ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}`
    : '';

  return (
    <div className="bg-[#191919] text-white px-4 md:px-10 pt-20 md:pt-24 pb-6 md:pb-8">
      <div className="w-full mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[12px] md:text-[14px] font-medium uppercase tracking-wide opacity-60 mb-2">
              INVESTOR PROFILE
            </div>
            <h1 className="text-xl md:text-2xl font-philosopher font-bold">
              RWA Portfolio
              {account && (
                <span className="ml-3 text-sm md:text-base font-inter font-normal opacity-60">
                  {truncatedAddress}
                </span>
              )}
            </h1>
          </div>
        </div>

        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Real World Assets (RWA)"
            className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
