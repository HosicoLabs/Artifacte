'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { RWAAuction, AuctionTimePeriod } from '@/lib/types';
import { Badge } from '@/comps/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/comps/ui/card';
import { Separator } from '@/comps/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/comps/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/comps/ui/collapsible';
import { ChevronDown, Heart, Share2, FileText, Download, Shield, Clock } from 'lucide-react';

interface RWAAuctionDetailViewProps {
  auction: RWAAuction;
}

export default function RWAAuctionDetailView({ auction }: RWAAuctionDetailViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<AuctionTimePeriod>('1Y');
  const [isLegalExpanded, setIsLegalExpanded] = useState(false);

  const timeRemaining = useMemo(() => {
    const now = new Date().getTime();
    const endTime = auction.auctionEndsAt.getTime();
    const diff = endTime - now;

    if (diff <= 0) {
      return { days: 0, hours: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours };
  }, [auction.auctionEndsAt]);

  const filteredValuationHistory = useMemo(() => {
    const now = new Date();
    let monthsBack = 12;

    if (selectedPeriod === '1M') monthsBack = 1;
    if (selectedPeriod === '6M') monthsBack = 6;

    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);

    return auction.valuationHistory.filter((point) => point.date >= cutoffDate);
  }, [auction.valuationHistory, selectedPeriod]);

  const maxValue = useMemo(() => {
    return Math.max(...filteredValuationHistory.map((p) => p.value));
  }, [filteredValuationHistory]);

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  function formatFileSize(bytes?: number): string {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  return (
    <div className="max-w-480 mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16">
        
        <div className="space-y-6">
          <div className="relative aspect-4/3 bg-[#EEECE9] rounded-lg overflow-hidden">
            <Image
              src={auction.image}
              alt={auction.name}
              fill
              className="object-cover"
              priority
            />
            
            {auction.custodyVerified && (
              <div className="absolute top-4 left-4">
                <Badge variant="success" className="text-xs font-semibold px-3 py-1.5 gap-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  PHYSICAL CUSTODY VERIFIED
                </Badge>
              </div>
            )}
          </div>

          {auction.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {auction.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 shrink-0 bg-[#EEECE9] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={img}
                    alt={`${auction.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <p className="text-[#AC463A] text-xs font-semibold uppercase tracking-wider mb-1">
                  {auction.series}
                </p>
                <h1 className="text-[#0A0F2E] text-3xl lg:text-4xl font-bold font-['Philosopher'] leading-tight">
                  {auction.name}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-[#EEECE9] rounded-full transition-colors"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-6 h-6 text-[#191919]" />
                </button>
                <button
                  className="p-2 hover:bg-[#EEECE9] rounded-full transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-6 h-6 text-[#191919]" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <FileText className="w-4 h-4 text-[#AC463A]" />
              <span>Asset ID: {auction.assetId}</span>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#857F94] text-sm mb-1">APPRAISED VALUE</p>
              <p className="text-[#0A0F2E] text-2xl font-bold">
                {formatCurrency(auction.appraisedValue)}
              </p>
            </div>
            <div>
              <p className="text-[#857F94] text-sm mb-1">CONDITION GRADE</p>
              <p className="text-[#0A0F2E] text-2xl font-bold">
                {auction.conditionGrade}
              </p>
            </div>
          </div>
          <Separator className="my-4" />

          <Card>
            <Collapsible open={isLegalExpanded} onOpenChange={setIsLegalExpanded}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-[#EEECE9]/5 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#AC463A]" />
                  <span className="text-[#0A0F2E] font-semibold">
                    Legal Ownership & Verification
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#6B7280] transition-transform ${
                    isLegalExpanded ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {auction.legalDescription}
                </p>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <div>
            <h3 className="text-[#0A0F2E] font-semibold mb-3">Documents</h3>
            <div className="space-y-2">
              {auction.documents.map((doc) => (
                <Card key={doc.id} className="hover:border-[#AC463A] transition-colors group">
                  <a href={doc.url} download className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#AC463A]" />
                      <div>
                        <p className="text-[#0A0F2E] font-medium text-sm">{doc.name}</p>
                        {doc.size && (
                          <p className="text-[#857F94] text-xs">{formatFileSize(doc.size)}</p>
                        )}
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-[#AC463A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-[#0A0F2E] border-[#0A0F2E] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#D9D9D9] text-sm mb-1">CURRENT BID PRICE</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(auction.currentBidPrice)}
                  </p>
                  <p className="text-[#857F94] text-sm mt-1">
                    {auction.currentBidETH} ETH
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#D9D9D9] text-sm mb-1 flex items-center gap-2 justify-end">
                    <Clock className="w-4 h-4" />
                    AUCTION ENDS
                  </p>
                  <p className="text-2xl font-bold">
                    {timeRemaining.days.toString().padStart(2, '0')} <span className="text-[#857F94] text-sm">DAYS</span>
                  </p>
                  <p className="text-[#857F94] text-sm mt-1">
                    {timeRemaining.hours} HRS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Asset Valuation History</CardTitle>
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as AuctionTimePeriod)}>
              <TabsList>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="6M">6M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-2">
          {filteredValuationHistory.map((point, idx) => {
            const heightPercent = (point.value / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative group">
                  <div
                    className="w-full bg-linear-to-t from-[#AC463A] to-[#AC463A]/60 rounded-t-lg transition-all group-hover:from-[#AC463A] group-hover:to-[#AC463A]/80"
                    style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-[#191919] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {formatCurrency(point.value)}
                    </div>
                  </div>
                </div>
                <p className="text-[#857F94] text-xs">
                  {point.date.toLocaleDateString('en-US', { month: 'short' })}
                </p>
              </div>
            );
          })}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Verification & Bid History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
          {auction.bidHistory.map((bid, idx) => (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                idx % 2 === 0 ? 'bg-[#0A0F2E]/5' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EEECE9] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#6B7280]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#0A0F2E] font-semibold">{bid.bidderName}</p>
                    {bid.verified && (
                      <Badge variant="success" className="text-xs gap-1">
                        <Shield className="w-3 h-3" />
                        KYC Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-[#857F94] text-sm">{formatRelativeTime(bid.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#0A0F2E] text-lg font-bold">
                  {formatCurrency(bid.amount)}
                </p>
                <p className="text-[#857F94] text-sm capitalize">{bid.bidderType}</p>
              </div>
            </div>
          ))}
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D9D9D9] shadow-lg">
        <div className="max-w-480 mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[#857F94] text-sm">Current Bid</p>
              <p className="text-[#0A0F2E] text-2xl font-bold">
                {formatCurrency(auction.currentBidPrice)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-8 py-3 border-2 border-[#AC463A] text-[#AC463A] font-semibold rounded-lg hover:bg-[#AC463A]/5 transition-colors">
                Place Bid
              </button>
              {auction.buyNowPrice && (
                <button className="px-8 py-3 bg-[#AC463A] text-white font-semibold rounded-lg hover:bg-[#AC463A]/90 transition-colors">
                  Buy Now: {formatCurrency(auction.buyNowPrice)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
