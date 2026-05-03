"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Home, Info, Phone, MapPin, ChevronDown, Car, Key, Bike, IndianRupee } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const buyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sellTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBuyEnter = () => {
    if (buyTimerRef.current) clearTimeout(buyTimerRef.current);
    setBuyDropdownOpen(true);
  };
  const handleBuyLeave = () => {
    buyTimerRef.current = setTimeout(() => setBuyDropdownOpen(false), 200);
  };

  const handleSellEnter = () => {
    if (sellTimerRef.current) clearTimeout(sellTimerRef.current);
    setSellDropdownOpen(true);
  };
  const handleSellLeave = () => {
    sellTimerRef.current = setTimeout(() => setSellDropdownOpen(false), 200);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200 transition-all duration-300 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-light tracking-tighter">
                <span className="text-[#051b3d] font-medium">BIKE</span>
                <span className="text-[#ef6a22]">49</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ef6a22]"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/" className="text-gray-500 hover:text-[#051b3d] px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2">
                <Home size={16} /> Home
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={handleBuyEnter}
                onMouseLeave={handleBuyLeave}
              >
                <Link href="/buy" className="text-gray-500 hover:text-[#051b3d] px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-1 group">
                  <div className="flex items-center -space-x-1 group-hover:text-[#ef6a22] transition-colors">
                    <Car size={16} />
                    <Key size={10} className="opacity-70" />
                  </div>
                  <span className="ml-1">Buy</span>
                  <ChevronDown size={14} className="ml-1" />
                </Link>
                {buyDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-none shadow-lg bg-white border border-gray-200 py-2 focus:outline-none transition-all z-50">
                    <Link href="/buy?type=bike" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">Bike</Link>
                    <Link href="/buy?type=scooter" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">Scooter</Link>
                    <Link href="/buy?type=ev" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">EV</Link>
                  </div>
                )}
              </div>

              <div 
                className="relative"
                onMouseEnter={handleSellEnter}
                onMouseLeave={handleSellLeave}
              >
                <Link href="/sell" className="text-gray-500 hover:text-[#051b3d] px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-1 group">
                  <div className="flex items-center group-hover:text-[#ef6a22] transition-colors">
                    <Bike size={16} />
                    <Key size={10} className="opacity-70" />
                    <IndianRupee size={12} className="opacity-70" />
                  </div>
                  <span className="ml-1">Sell</span>
                  <ChevronDown size={14} className="ml-1" />
                </Link>
                {sellDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-none shadow-lg bg-white border border-gray-200 py-2 focus:outline-none transition-all z-50">
                    <Link href="/sell?type=bike" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">Sell Bike</Link>
                    <Link href="/sell?type=scooter" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">Sell Scooter</Link>
                    <Link href="/sell?type=ev" className="block px-6 py-3 text-sm uppercase tracking-widest font-semibold text-gray-500 hover:bg-[#f4f5f7] hover:text-[#ef6a22] transition-colors">Sell EV</Link>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-gray-500 hover:text-[#051b3d] px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2"><Info size={16} /> About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-[#051b3d] px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2"><Phone size={16} /> Contact</Link>
              
              <div className="relative">
                <select className="appearance-none bg-transparent text-[#051b3d] border-b border-gray-300 rounded-none py-2 pl-8 pr-8 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:border-[#ef6a22] transition-colors cursor-pointer">
                  <option value="nagpur" className="bg-white text-[#051b3d]">NAGPUR</option>
                  <option value="pune" className="bg-white text-[#051b3d]">PUNE</option>
                  <option value="raipur" className="bg-white text-[#051b3d]">RAIPUR</option>
                  <option value="indore" className="bg-white text-[#051b3d]">INDORE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <MapPin size={16} />
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-100 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f8931f]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-widest text-gray-500 hover:text-[#051b3d] hover:bg-gray-50">Home</Link>
            
            <div className="px-3 py-2">
              <div className="text-base font-semibold uppercase tracking-widest text-gray-500 mb-1">Buy</div>
              <div className="pl-4 space-y-1 border-l-2 border-gray-200">
                <Link href="/buy?type=bike" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">Bike</Link>
                <Link href="/buy?type=scooter" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">Scooter</Link>
                <Link href="/buy?type=ev" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">EV</Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <div className="text-base font-semibold uppercase tracking-widest text-gray-500 mb-1">Sell</div>
              <div className="pl-4 space-y-1 border-l-2 border-gray-200">
                <Link href="/sell?type=bike" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">Sell Bike</Link>
                <Link href="/sell?type=scooter" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">Sell Scooter</Link>
                <Link href="/sell?type=ev" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-widest font-semibold text-gray-400 hover:text-[#051b3d] hover:bg-gray-50 rounded-md">Sell EV</Link>
              </div>
            </div>

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-widest text-gray-500 hover:text-[#051b3d] hover:bg-gray-50">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-widest text-gray-500 hover:text-[#051b3d] hover:bg-gray-50">Contact</Link>
            
            <div className="px-3 py-2">
              <div className="relative inline-block w-full mt-2">
                <select className="w-full appearance-none bg-white text-[#051b3d] border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:border-[#ef6a22]">
                  <option value="nagpur">NAGPUR</option>
                  <option value="pune">PUNE</option>
                  <option value="raipur">RAIPUR</option>
                  <option value="indore">INDORE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
