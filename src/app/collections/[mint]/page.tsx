/**
 * Individual NFT Page
 *
 * Route: /collections/[mint]
 * Server component wrapper for the NFT detail page
 */

import NFTPageClient from './NFTPageClient';

interface NFTPageProps {
  params: Promise<{ mint: string }>;
}

export default async function NFTPage({ params }: NFTPageProps) {
  const { mint } = await params;

  return <NFTPageClient mint={mint} />;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: NFTPageProps) {
  const { mint } = await params;

  // TODO: Fetch NFT metadata for proper SEO
  return {
    title: `NFT ${mint.slice(0, 8)}... | Artifacte`,
    description: 'View and purchase this NFT on Artifacte - the curated NFT marketplace',
  };
}
