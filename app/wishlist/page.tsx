"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Women" | "Men" | "Kids";
  price: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Lumière Silk Dress",
    category: "Women",
    price: 189,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 2,
    name: "Sienna Tailored Blazer",
    category: "Women",
    price: 245,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 3,
    name: "Élan Satin Midi",
    category: "Women",
    price: 175,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 4,
    name: "Noir Minimal Knit",
    category: "Women",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 5,
    name: "Maison Wool Coat",
    category: "Men",
    price: 320,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 6,
    name: "Linen Signature Shirt",
    category: "Men",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 7,
    name: "Aurel Classic Loafers",
    category: "Men",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 8,
    name: "Atelier Relaxed Trousers",
    category: "Men",
    price: 165,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 9,
    name: "Petit Linen Set",
    category: "Kids",
    price: 89,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 10,
    name: "Little Maison Dress",
    category: "Kids",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 11,
    name: "Mini Classic Shirt",
    category: "Kids",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 12,
    name: "Petit Weekend Set",
    category: "Kids",
    price: 79,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=90",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved wishlist and cart once
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("aurelia-wishlist");
      const savedCart = localStorage.getItem("aurelia-cart");

      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlist(
            parsedWishlist
              .map(Number)
              .filter((id) => Number.isFinite(id))
          );
        }
      }

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(
            parsedCart
              .map(Number)
              .filter((id) => Number.isFinite(id))
          );
        }
      }
    } catch (error) {
      console.error("Could not load wishlist data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save wishlist
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "aurelia-wishlist",
      JSON.stringify(wishlist)
    );

    // Tell Navbar to update its counter
    window.dispatchEvent(
      new Event("aurelia-wishlist-updated")
    );
  }, [wishlist, isLoaded]);

  // Save cart
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "aurelia-cart",
      JSON.stringify(cart)
    );

    // Tell Navbar to update its counter
    window.dispatchEvent(
      new Event("aurelia-cart-updated")
    );
  }, [cart, isLoaded]);

  // Remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist((current) =>
      current.filter((item) => item !== id)
    );
  };

  // Add item to cart
  const addToBag = (id: number) => {
    setCart((current) => [...current, id]);
  };

  // Products that are currently in wishlist
  const savedProducts = useMemo(() => {
    return products.filter((product) =>
      wishlist.includes(product.id)
    );
  }, [wishlist]);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/45">
            AURELIA / Saved Pieces
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-light tracking-[-0.04em] md:text-7xl">
                Wishlist
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-black/55">
                Pieces you loved enough to keep close.
                Your saved collection is waiting for you.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "Piece" : "Pieces"}
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist products */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16 lg:px-12">
        {!isLoaded ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
              Loading wishlist...
            </p>
          </div>
        ) : savedProducts.length === 0 ? (
          /* Empty state */
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
              <Heart
                size={24}
                strokeWidth={1.2}
              />
            </div>

            <h2 className="text-3xl font-light tracking-[-0.02em]">
              Your wishlist is empty.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-black/50">
              Save pieces you love and they will appear
              here for later.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
            >
              Explore the Shop
              <ArrowRight
                size={15}
                strokeWidth={1.5}
              />
            </Link>
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
              {savedProducts.map((product) => (
                <article
                  key={product.id}
                  className="group"
                >
                  <div className="relative overflow-hidden bg-[#e9e4da]">
                    <Link href={`/product/${product.id}`}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </Link>

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute left-3 top-3 bg-[#f7f4ee] px-2.5 py-1 text-[8px] uppercase tracking-[0.18em]">
                        {product.badge}
                      </span>
                    )}

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f4ee]/90 backdrop-blur-sm transition hover:bg-white"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.5}
                        fill="currentColor"
                      />
                    </button>

                    {/* Desktop Add to Bag */}
                    <button
                      onClick={() =>
                        addToBag(product.id)
                      }
                      className="absolute bottom-3 left-3 right-3 translate-y-2 bg-[#171717] py-3 text-[9px] uppercase tracking-[0.22em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Add to Bag
                    </button>
                  </div>

                  {/* Product info */}
                  <div className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="text-[12px] leading-5 hover:underline"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40">
                          {product.category}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-[12px]">
                        ${product.price}
                      </p>
                    </div>

                    {/* Mobile buttons */}
                    <div className="mt-4 flex gap-2 md:hidden">
                      <button
                        onClick={() =>
                          addToBag(product.id)
                        }
                        className="flex flex-1 items-center justify-center gap-2 border border-black/15 py-2.5 text-[9px] uppercase tracking-[0.16em] transition hover:border-black hover:bg-black hover:text-white"
                      >
                        <ShoppingBag
                          size={13}
                          strokeWidth={1.5}
                        />
                        Add
                      </button>

                      <button
                        onClick={() =>
                          removeFromWishlist(product.id)
                        }
                        aria-label="Remove"
                        className="flex h-[38px] w-[38px] items-center justify-center border border-black/15 transition hover:border-black"
                      >
                        <Trash2
                          size={14}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-16 border-t border-black/10 pt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]"
              >
                Continue Shopping
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Quote */}
      <section className="border-t border-black/10 px-5 py-24 text-center md:py-32">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
          Keep what
          <br />
          feels like you.
        </h2>
      </section>
    </main>
  );
}