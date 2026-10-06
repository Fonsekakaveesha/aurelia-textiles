"use client";

import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const updateCounts = () => {
    try {
      const savedWishlist = localStorage.getItem("aurelia-wishlist");
      const savedCart = localStorage.getItem("aurelia-cart");

      const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
      const cart = savedCart ? JSON.parse(savedCart) : [];

      setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);
      setCartCount(Array.isArray(cart) ? cart.length : 0);
    } catch {
      setWishlistCount(0);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener(
      "aurelia-wishlist-updated",
      updateCounts
    );
    window.addEventListener(
      "aurelia-cart-updated",
      updateCounts
    );

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener(
        "aurelia-wishlist-updated",
        updateCounts
      );
      window.removeEventListener(
        "aurelia-cart-updated",
        updateCounts
      );
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-black/10 bg-[#f7f4ee]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="text-[21px] font-medium tracking-[0.28em] text-[#171717] transition-opacity duration-300 hover:opacity-60"
        >
          AURELIA
        </Link>

        {/* Desktop Navigation - 1024px and above */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          <Link
            href="/"
            className="text-[12px] uppercase tracking-[0.16em] text-[#171717] transition-opacity hover:opacity-50"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-[12px] uppercase tracking-[0.16em] text-[#171717] transition-opacity hover:opacity-50"
          >
            Shop
          </Link>

          <Link
            href="/collections"
            className="text-[12px] uppercase tracking-[0.16em] text-[#171717] transition-opacity hover:opacity-50"
          >
            Collections
          </Link>

          <Link
            href="/about"
            className="text-[12px] uppercase tracking-[0.16em] text-[#171717] transition-opacity hover:opacity-50"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions - 1024px and above */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">

          {/* Search */}
          <Link
            href="/shop"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.4} />
          </Link>

          {/* Account */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
            aria-label="Account"
          >
            <User size={19} strokeWidth={1.4} />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
            aria-label="Wishlist"
          >
            <Heart size={19} strokeWidth={1.4} />

            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] font-medium text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={19} strokeWidth={1.4} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Tablet + Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Tablet + Mobile Menu */}
      {open && (
        <div className="border-t border-black/10 bg-[#f7f4ee] px-6 py-8 lg:hidden">
          <nav className="flex flex-col">

            {/* Home */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              Home
            </Link>

            {/* Shop */}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              Shop
            </Link>

            {/* Collections */}
            <Link
              href="/collections"
              onClick={() => setOpen(false)}
              className="border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              Collections
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              About
            </Link>

            {/* Search */}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              <Search size={17} strokeWidth={1.4} />
              Search
            </Link>

            {/* Account */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-black/10 py-4 text-left text-[12px] uppercase tracking-[0.18em]"
            >
              <User size={17} strokeWidth={1.4} />
              Account
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-black/10 py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              <span className="flex items-center gap-3">
                <Heart size={17} strokeWidth={1.4} />
                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#171717] px-2 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 text-[12px] uppercase tracking-[0.18em]"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={17} strokeWidth={1.4} />
                Shopping Bag
              </span>

              {cartCount > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#171717] px-2 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}