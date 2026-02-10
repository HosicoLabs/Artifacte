import { notFound } from 'next/navigation';
import { getAuctionById } from '@/lib/rwa-data';
import RWAAuctionClient from './RWAAuctionClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AuctionDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const auction = getAuctionById(resolvedParams.id);

  if (!auction) {
    notFound();
  }

  return <RWAAuctionClient auction={auction} />;
}
