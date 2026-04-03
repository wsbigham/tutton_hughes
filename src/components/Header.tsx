"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-midnight-blue text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28 sm:h-32">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-[86px] h-[86px] sm:w-[108px] sm:h-[108px]">
                <Image
                  src="/tutton_hughes_logo.png"
                  alt="Tutton Hughes Auto Sales Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black uppercase tracking-wider text-yellow-gold leading-none mb-1">Tutton Hughes</h1>
                <p className="text-base font-medium tracking-wide leading-none opacity-80">Auto Sales LLC</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-yellow-gold font-bold transition-colors uppercase text-sm tracking-widest">
              Home
            </Link>
            <Link href="/inventory" className="text-white hover:text-yellow-gold font-bold transition-colors uppercase text-sm tracking-widest">
              Inventory
            </Link>
            <Link href="/financing" className="text-white hover:text-yellow-gold font-bold transition-colors uppercase text-sm tracking-widest">
              Financing
            </Link>
            <Link href="/contact" className="text-white hover:text-yellow-gold font-bold transition-colors uppercase text-sm tracking-widest">
              Contact
            </Link>
          </nav>

          {/* Contact CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:4706491117"
              className="bg-yellow-gold text-midnight-blue hover:bg-gold-hover px-6 py-3 rounded-md font-black transition-all shadow-md active:transform active:scale-95"
            >
              (470) 649-1117
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-yellow-gold p-2 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-midnight-blue border-t border-gray-800 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white hover:text-yellow-gold border-b border-gray-800"
            >
              Home
            </Link>
            <Link 
              href="/inventory" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white hover:text-yellow-gold border-b border-gray-100/10"
            >
              Inventory
            </Link>
            <Link 
              href="/financing" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white hover:text-yellow-gold border-b border-gray-100/10"
            >
              Financing
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white hover:text-yellow-gold"
            >
              Contact
            </Link>
            <div className="pt-4 pb-2 px-3">
              <a
                href="tel:7068080110"
                className="block w-full text-center bg-yellow-gold text-midnight-blue py-4 rounded-md font-black shadow-lg"
              >
                CALL: (706) 808-0110
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

