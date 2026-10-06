
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
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

export default function CartPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aurelia-cart");

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
      console.error("Could not load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart and update Navbar counter
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("aurelia-cart", JSON.stringify(cart));

    window.dispatchEvent(
      new Event("aurelia-cart-updated")
    );
  }, [cart, isLoaded]);

  // Group cart IDs into products + quantities
  const cartItems = useMemo(() => {
    const grouped = new Map<number, number>();

    cart.forEach((id) => {
      grouped.set(id, (grouped.get(id) || 0) + 1);
    });

    return products
      .filter((product) => grouped.has(product.id))
      .map((product) => ({
        ...product,
        quantity: grouped.get(product.id) || 1,
      }));
  }, [cart]);

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Free shipping over $250
  const shipping =
    subtotal === 0 || subtotal >= 250 ? 0 : 15;

  const total = subtotal + shipping;

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCart((current) => [...current, id]);
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCart((current) => {
      const index = current.indexOf(id);

      if (index === -1) {
        return current;
      }

      const updated = [...current];
      updated.splice(index, 1);

      return updated;
    });
  };

  // Remove product completely
  const removeItem = (id: number) => {
    setCart((current) =>
      current.filter((item) => item !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/45">
            AURELIA / Shopping Bag
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-light tracking-[-0.04em] md:text-7xl">
                Shopping Bag
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-black/55">
                Your carefully selected pieces,
                ready when you are.
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
              {cart.length}{" "}
              {cart.length === 1 ? "Item" : "Items"}
            </p>
          </div>
        </div>
      </section>

      {/* Cart content */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16 lg:px-12">
        {!isLoaded ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
              Loading your bag...
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty cart */
          <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full rounded-full border border-black/10">
              <ShoppingBag
                size={24}
                strokeWidth={1.2}
              />
            </div>

            <h2 className="text-3xl font-light tracking-[-0.02em]">
              Your bag is empty.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-black/50">
              Discover timeless pieces and add your
              favourites to the bag.
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
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
            {/* Items */}
            <div>
              <div className="mb-7 flex items-center justify-between border-b border-black/10 pb-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
                  Selected Pieces
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
                  {cart.length} Items
                </p>
              </div>

              <div className="divide-y divide-black/10">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 py-7 md:gap-6"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.id}`}
                      className="w-[110px] shrink-0 overflow-hidden bg-[#e9e4da] md:w-[160px]"
                    >
                      <div className="aspect-[3/4]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/product/${item.id}`}
                              className="text-sm hover:underline"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                              {item.category}
                            </p>
                          </div>

                          <p className="whitespace-nowrap text-sm">
                            $
                            {(
                              item.price *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>

                        <p className="mt-3 text-[11px] text-black/45">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center border border-black/15">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-9 w-9 items-center justify-center transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus
                              size={13}
                              strokeWidth={1.5}
                            />
                          </button>

                          <span className="flex h-9 w-9 items-center justify-center border-x border-black/15 text-[11px]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center transition hover:bg-black hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus
                              size={13}
                              strokeWidth={1.5}
                            />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-black/45 transition hover:text-black"
                        >
                          <Trash2
                            size={14}
                            strokeWidth={1.5}
                          />

                          <span className="hidden sm:inline">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="mt-8 border-t border-black/10 pt-7">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.5}
                  />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="h-fit bg-[#e9e4da] p-7 md:p-9 lg:sticky lg:top-[100px]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/45">
                Order Summary
              </p>

              <div className="mt-8 space-y-5 border-b border-black/10 pb-7">
                <div className="flex justify-between text-sm">
                  <span className="text-black/55">
                    Subtotal
                  </span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-black/55">
                    Shipping
                  </span>

                  <span>
                    {shipping === 0
                      ? "Complimentary"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {subtotal > 0 && subtotal < 250 && (
                <p className="mt-5 text-[10px] leading-5 text-black/50">
                  Add ${(250 - subtotal).toFixed(2)} more
                  to receive complimentary shipping.
                </p>
              )}

              <div className="mt-7 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  Total
                </span>

                <span className="text-xl font-light">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout */}
              <Link
                href="/checkout"
                className="mt-8 flex w-full items-center justify-center gap-3 bg-[#171717] py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
              >
                Proceed to Checkout

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                />
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-black/40">
                <ShoppingBag
                  size={13}
                  strokeWidth={1.5}
                />
                Secure checkout
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Bottom statement */}
      <section className="border-t border-black/10 px-5 py-24 text-center md:py-32">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
          Take your time.
          <br />
          Choose beautifully.
        </h2>
      </section>
    </main>
  );
}

