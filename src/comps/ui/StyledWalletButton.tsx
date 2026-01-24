"use client";
import { useWalletUi, useWalletUiWallet, ellipsify, UiWallet } from "@wallet-ui/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface StyledWalletButtonProps {
  variant?: "light" | "dark";
  isMobile?: boolean;
}

function WalletItem({ wallet, onConnect }: { wallet: UiWallet; onConnect: () => void }) {
  const { connect } = useWalletUiWallet({ wallet });

  const handleClick = async () => {
    await connect();
    onConnect();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-3 text-left text-sm text-[#111] hover:bg-gray-100 transition-colors font-inter flex items-center gap-2"
      type="button"
    >
      {wallet.icon && (
        <img src={wallet.icon} alt={wallet.name} className="w-5 h-5 rounded" />
      )}
      {wallet.name}
    </button>
  );
}

export default function StyledWalletButton({ 
  variant = "light",
  isMobile = false 
}: StyledWalletButtonProps) {
  const { account, connected, copy, disconnect, wallet, wallets } = useWalletUi();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const baseClasses = "cursor-pointer font-medium font-inter py-3 px-10";
  const variantClasses = variant === "light" 
    ? "bg-white text-[#111]" 
    : "bg-[#111] text-white";
  const mobileClasses = isMobile ? "md:hidden border border-solid border-[#d9d9d9]" : "";

  const buttonText = connected 
    ? (account ? ellipsify(account.address) : wallet?.name || "Connected")
    : "Connect";

  const handleCopy = () => {
    copy();
    setIsDropdownOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
        className={cn(baseClasses, variantClasses, mobileClasses, "flex items-center gap-2")}
        type="button"
      >
        {connected && wallet?.icon && (
          <img src={wallet.icon} alt={wallet.name} className="w-5 h-5 rounded" />
        )}
        {buttonText}
      </button>
      
      {isDropdownOpen && (
        <div 
          className={cn(
            "absolute top-full right-0 mt-2 bg-white border border-[#d9d9d9] shadow-lg rounded-md overflow-hidden z-50 min-w-[200px]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {connected && account ? (
            <>
              <button
                onClick={handleCopy}
                className="w-full px-4 py-3 text-left text-sm text-[#111] hover:bg-gray-100 transition-colors font-inter"
                type="button"
              >
                Copy address
              </button>
              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-3 text-left text-sm text-[#111] hover:bg-gray-100 transition-colors border-t border-[#d9d9d9] font-inter"
                type="button"
              >
                Disconnect
              </button>
              <div className="border-t border-[#d9d9d9]" />
            </>
          ) : null}
          
          {wallets.length ? (
            wallets.map((w) => (
              <WalletItem 
                key={w.name} 
                wallet={w} 
                onConnect={() => setIsDropdownOpen(false)}
              />
            ))
          ) : (
            <a
              href="https://solana.com/ecosystem/explore?categories=wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 text-left text-sm text-[#111] hover:bg-gray-100 transition-colors font-inter block"
            >
              Get a Solana wallet
            </a>
          )}
        </div>
      )}
    </div>
  );
}
