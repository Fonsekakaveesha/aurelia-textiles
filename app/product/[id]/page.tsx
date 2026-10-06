"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  category: "Women" | "Men" | "Kids";
  price: number;
  image: string;
  badge?: string;
  description: string;
  material: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Lumière Silk Dress",
    category: "Women",
    price: 189,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90",
    description:
      "An effortlessly elegant silk dress designed with a fluid silhouette and a refined finish. Made for moments that call for understated confidence.",
    material: "100% Silk",
  },
  {
    id: 2,
    name: "Sienna Tailored Blazer",
    category: "Women",
    price: 245,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90",
    description:
      "A softly structured blazer with a timeless tailored silhouette. Designed to bring quiet sophistication to everyday dressing.",
    material: "Wool Blend",
  },
  {
    id: 3,
    name: "Élan Satin Midi",
    category: "Women",
    price: 175,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90",
    description:
      "A graceful satin midi with an elegant drape and polished finish. A versatile piece for both day and evening.",
    material: "Satin Blend",
  },
  {
    id: 4,
    name: "Noir Minimal Knit",
    category: "Women",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90",
    description:
      "A refined everyday knit defined by its clean lines and comfortable silhouette. Minimal, versatile and easy to layer.",
    material: "Premium Cotton Blend",
  },
  {
    id: 5,
    name: "Maison Wool Coat",
    category: "Men",
    price: 320,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=90",
    description:
      "A timeless wool coat with a clean architectural silhouette. Designed for colder days without compromising on elegance.",
    material: "Wool Blend",
  },
  {
    id: 6,
    name: "Linen Signature Shirt",
    category: "Men",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",
    description:
      "A relaxed linen shirt designed for effortless everyday dressing. Lightweight, breathable and naturally refined.",
    material: "100% Linen",
  },
  {
    id: 7,
    name: "Aurel Classic Loafers",
    category: "Men",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=90",
    description:
      "Classic loafers with a clean profile and polished finish. An understated essential designed to work across seasons.",
    material: "Leather",
  },
  {
    id: 8,
    name: "Atelier Relaxed Trousers",
    category: "Men",
    price: 165,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90",
    description:
      "Relaxed trousers with a refined silhouette and effortless movement. Designed for modern everyday wardrobes.",
    material: "Cotton Blend",
  },
  {
    id: 9,
    name: "Petit Linen Set",
    category: "Kids",
    price: 89,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=90",
    description:
      "A beautifully simple linen set created for comfort and everyday adventures. Soft, practical and timeless.",
    material: "100% Linen",
  },
  {
    id: 10,
    name: "Little Maison Dress",
    category: "Kids",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=90",
    description:
      "A charming everyday dress with a soft silhouette and delicate details. Designed for comfort and effortless style.",
    material: "Cotton Blend",
  },
  {
    id: 11,
    name: "Mini Classic Shirt",
    category: "Kids",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=90",
    description:
      "A classic shirt designed with a comfortable fit and timeless appeal. An easy essential for everyday wear.",
    material: "Premium Cotton",
  },
  {
    id: 12,
    name: "Petit Weekend Set",
    category: "Kids",
    price: 79,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=90",
    description:
      "A comfortable weekend set made for relaxed days. Simple, versatile and designed for movement.",
    material: "Cotton Blend",
  },
];

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = Number(params.id);

  const product = products.find(
    (item) => item.id === productId
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist
  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem("aurelia-wishlist");

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
    } catch (error) {
      console.error(
        "Could not load wishlist:",
        error
      );
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

    window.dispatchEvent(
      new Event("aurelia-wishlist-updated")
    );
  }, [wishlist, isLoaded]);

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
        <div className="h-[76px]" />

        <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            AURELIA
          </p>

          <h1 className="mt-5 text-4xl font-light">
            Product not found.
          </h1>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-white"
          >
            Back to Shop
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </section>
      </main>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = () => {
    setWishlist((current) => {
      if (current.includes(product.id)) {
        return current.filter(
          (id) => id !== product.id
        );
      }

      return [...current, product.id];
    });
  };

  const addToBag = () => {
    try {
      const savedCart =
        localStorage.getItem("aurelia-cart");

      let currentCart: number[] = [];

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          currentCart = parsedCart
            .map(Number)
            .filter((id) => Number.isFinite(id));
        }
      }

      for (let i = 0; i < quantity; i++) {
        currentCart.push(product.id);
      }

      localStorage.setItem(
        "aurelia-cart",
        JSON.stringify(currentCart)
      );

      window.dispatchEvent(
        new Event("aurelia-cart-updated")
      );
    } catch (error) {
      console.error(
        "Could not add product to cart:",
        error
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Back to shop */}
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8 lg:px-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-black/50 transition hover:text-black"
        >
          <ArrowLeft
            size={15}
            strokeWidth={1.5}
          />
          Back to Shop
        </Link>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Product image */}
          <div className="relative overflow-hidden bg-[#e9e4da]">
            <div className="aspect-[4/5]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {product.badge && (
              <span className="absolute left-5 top-5 bg-[#f7f4ee] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product information */}
          <div className="flex flex-col justify-center lg:max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              {product.category}
            </p>

            <h1 className="mt-5 text-4xl font-light leading-tight tracking-[-0.035em] md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-xl font-light">
              ${product.price.toFixed(2)}
            </p>

            <div className="my-8 border-y border-black/10 py-7">
              <p className="text-sm leading-7 text-black/60">
                {product.description}
              </p>
            </div>

            {/* Size */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em]">
                  Select Size
                </p>

                <button className="text-[9px] uppercase tracking-[0.15em] text-black/45 underline">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L"].map(
                  (size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`py-3 text-[10px] uppercase tracking-[0.15em] transition ${
                        selectedSize === size
                          ? "bg-[#171717] text-white"
                          : "border border-black/15 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em]">
                Quantity
              </p>

              <div className="flex w-fit items-center border border-black/15">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center transition hover:bg-black hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus
                    size={14}
                    strokeWidth={1.5}
                  />
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-black/15 text-sm">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="flex h-11 w-11 items-center justify-center transition hover:bg-black hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus
                    size={14}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={addToBag}
                className="flex flex-1 items-center justify-center gap-3 bg-[#171717] py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
              >
                <ShoppingBag
                  size={16}
                  strokeWidth={1.5}
                />
                Add to Bag
              </button>

              <button
                onClick={toggleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`flex h-[52px] w-[52px] items-center justify-center border transition ${
                  isWishlisted
                    ? "border-black bg-black text-white"
                    : "border-black/15 hover:border-black"
                }`}
              >
                <Heart
                  size={19}
                  strokeWidth={1.5}
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* Product information */}
            <div className="mt-10 border-t border-black/10">
              <div className="flex items-center justify-between border-b border-black/10 py-5">
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Material
                </span>

                <span className="text-xs text-black/55">
                  {product.material}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-black/10 py-5">
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Shipping
                </span>

                <span className="text-xs text-black/55">
                  Complimentary over $250
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-black/10 py-5">
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Returns
                </span>

                <span className="text-xs text-black/55">
                  Easy 14-day returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial statement */}
      <section className="border-t border-black/10 px-5 py-24 text-center md:py-32">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
          Made to be worn.
          <br />
          Made to be remembered.
        </h2>

        <Link
          href="/shop"
          className="mt-9 inline-flex items-center gap-3 border-b border-black pb-2 text-[10px] uppercase tracking-[0.22em]"
        >
          Explore More Pieces
          <ArrowRight
            size={15}
            strokeWidth={1.5}
          />
        </Link>
      </section>
    </main>
  );
}