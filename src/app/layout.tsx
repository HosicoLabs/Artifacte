import type { Metadata } from "next";
import "./globals.css";
import Topnav from "@/comps/ui/Topnav";
import Footer from "@/comps/ui/Footer";
import { SolanaProvider } from "@/comps/solana-provider";

export const metadata: Metadata = {
  title: "Artifacte",
  description: "Curating real-world assets...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <SolanaProvider>
          <Topnav />
          {children}
          <Footer />
        </SolanaProvider>
      </body>
    </html>
  );
}
