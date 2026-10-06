"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  X,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Category = "All" | "Women" | "Men" | "Kids";

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

function ShopPageContent() {
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");

  const getInitialCategory = (): Category => {
    if (
      urlCategory === "Women" ||
      urlCategory === "Men" ||
      urlCategory === "Kids"
    ) {
      return urlCategory;
    }

    return "All";
  };

  const [category, setCategory] =
    useState<Category>(getInitialCategory);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Keep category synchronized with the URL.
   *
   * Example:
   * /shop?category=Women
   * /shop?category=Men
   * /shop?category=Kids
   */
  useEffect(() => {
    if (
      urlCategory === "Women" ||
      urlCategory === "Men" ||
      urlCategory === "Kids"
    ) {
      setCategory(urlCategory);
    } else {
      setCategory("All");
    }
  }, [urlCategory]);

  /*
   * Load wishlist and cart once.
   */
  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem("aurelia-wishlist");

      const savedCart =
        localStorage.getItem("aurelia-cart");

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
      console.error(
        "Could not load shopping data:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
   * Save wishlist.
   *
   * IMPORTANT:
   * Do NOT add a wishlist event listener here.
   * That can create an infinite update loop.
   */
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "aurelia-wishlist",
      JSON.stringify(wishlist)
    );

    window.dispatchEvent(
      new Event("aurelia-wishlist-updated")
    );
  }, [wishlist, isLoaded]);

  /*
   * Save cart.
   */
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "aurelia-cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("aurelia-cart-updated")
    );
  }, [cart, isLoaded]);

  /*
   * Wishlist
   */
  const toggleWishlist = (id: number) => {
    setWishlist((current) => {
      if (current.includes(id)) {
        return current.filter(
          (item) => item !== id
        );
      }

      return [...current, id];
    });
  };

  /*
   * Add to bag
   */
  const addToBag = (id: number) => {
    setCart((current) => [...current, id]);
  };

  /*
   * Filter products.
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search.trim()) {
      const searchValue =
        search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchValue) ||
          product.category
            .toLowerCase()
            .includes(searchValue)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Announcement */}
      <div className="bg-[#171717] px-5 py-3 text-center text-[10px] uppercase tracking-[0.25em] text-white">
        Complimentary shipping on orders over $250
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-14 md:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/50">
              The AURELIA Edit
            </p>

            <h1 className="max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Curated
              <br />
              Essentials.
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-black/60">
              Thoughtfully selected pieces designed
              for everyday elegance. Timeless
              silhouettes, considered materials,
              effortless style.
            </p>
          </div>

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90"
              alt="AURELIA fashion collection"
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-black/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-6">
            {(
              ["All", "Women", "Men", "Kids"] as Category[]
            ).map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`text-[11px] uppercase tracking-[0.2em] transition ${
                  category === item
                    ? "border-b border-black pb-1 text-black"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-black/60 transition hover:text-black"
            >
              {searchOpen ? (
                <X
                  size={17}
                  strokeWidth={1.5}
                />
              ) : (
                <Search
                  size={17}
                  strokeWidth={1.5}
                />
              )}

              <span className="hidden sm:inline">
                Search
              </span>
            </button>

            <div className="relative flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="appearance-none bg-transparent pr-7 text-[11px] uppercase tracking-[0.15em] outline-none"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className="pointer-events-none absolute right-0"
              />
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-black/10">
            <div className="mx-auto max-w-[1440px] px-5 py-4 md:px-8 lg:px-12">
              <input
                autoFocus
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search pieces..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
              />
            </div>
          </div>
        )}
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            {filteredProducts.length} Pieces
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            {wishlist.length} Saved
          </p>
        </div>

        {!isLoaded ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
              Loading collection...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <p className="text-xl font-light">
              No pieces found.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {filteredProducts.map((product) => {
              const isWishlisted =
                wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group"
                >
                  <div className="relative overflow-hidden bg-[#e9e4da]">
                    <Link
                      href={`/product/${product.id}`}
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </Link>

                    {product.badge && (
                      <span className="absolute left-3 top-3 bg-[#f7f4ee] px-2.5 py-1 text-[8px] uppercase tracking-[0.18em]">
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f4ee]/90 backdrop-blur-sm transition hover:bg-white"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.5}
                        fill={
                          isWishlisted
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button
                      onClick={() =>
                        addToBag(product.id)
                      }
                      className="absolute bottom-3 left-3 right-3 translate-y-2 bg-[#171717] py-3 text-[9px] uppercase tracking-[0.22em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Add to Bag
                    </button>
                  </div>

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

                    <button
                      onClick={() =>
                        addToBag(product.id)
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 border border-black/15 py-2.5 text-[9px] uppercase tracking-[0.18em] transition hover:border-black hover:bg-black hover:text-white md:hidden"
                    >
                      <ShoppingBag
                        size={13}
                        strokeWidth={1.5}
                      />
                      Add to Bag
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8 md:px-8 lg:px-12">
        <div className="grid overflow-hidden bg-[#e9e4da] md:grid-cols-2">
          <div className="flex min-h-[360px] flex-col justify-center px-8 py-12 md:px-14 lg:px-20">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/45">
              The philosophy
            </p>

            <h2 className="mt-5 text-4xl font-light leading-tight tracking-[-0.03em] md:text-5xl">
              Less,
              <br />
              but better.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-black/60">
              We believe the best wardrobe is not
              the biggest one. It is a collection of
              pieces chosen with intention.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]"
            >
              Discover AURELIA
              <ArrowRight
                size={15}
                strokeWidth={1.5}
              />
            </Link>
          </div>

          <div className="min-h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90"
              alt="AURELIA editorial"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-black/10 px-5 py-24 text-center md:py-32">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
          Designed quietly.
          <br />
          Remembered forever.
        </h2>

        <Link
          href="/collections"
          className="mt-9 inline-flex items-center gap-3 border-b border-black pb-2 text-[10px] uppercase tracking-[0.22em]"
        >
          Explore Collections
          <ArrowRight
            size={15}
            strokeWidth={1.5}
          />
        </Link>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent />
    </Suspense>
  );
}