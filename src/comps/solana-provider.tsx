'use client';
import { ReactNode } from 'react';
import { createSolanaDevnet, createSolanaLocalnet, createWalletUiConfig, WalletUi } from '@wallet-ui/react';

const config = createWalletUiConfig({
    clusters: [
        createSolanaDevnet(),
        createSolanaLocalnet(),
    ],
});

export function SolanaProvider({ children }: { children: ReactNode }) {
    return <WalletUi config={config}>{children}</WalletUi>;
}
