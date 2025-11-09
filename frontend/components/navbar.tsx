"use client";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";

export function Navbar() {
  const { userData, connectWallet, disconnectWallet } = useStacks();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Stacks AMM
          </Link>

          {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Swap
            </Link>
            <Link 
              href="/pools" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Pools
            </Link>
          </div>

          {/* Wallet Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {userData ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="hidden sm:block rounded-lg bg-blue-500 px-3 sm:px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors shadow-md"
                >
                  {abbreviateAddress(userData.addresses?.stx[0].address)}
                </button>
                <button
                  type="button"
                  onClick={disconnectWallet}
                  className="rounded-lg bg-red-500 px-3 sm:px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors shadow-md"
                >
                  <span className="hidden sm:inline">Disconnect</span>
                  <span className="sm:hidden">✕</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                className="rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-3 sm:px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-lg"
              >
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Shown only on mobile */}
        <div className="md:hidden pb-3 flex gap-4 border-t border-white/20 pt-3">
          <Link 
            href="/" 
            className="flex-1 text-center py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Swap
          </Link>
          <Link 
            href="/pools" 
            className="flex-1 text-center py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Pools
          </Link>
        </div>
      </div>
    </nav>
  );
}
