
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Women" | "Men" | "Kids";
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Lumière Silk Dress",
    category: "Women",
    price: 189,
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
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 9,
    name: "Petit Linen Set",
    category: "Kids",
    price: 89,
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
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=90",
  },
];

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });

  const [delivery, setDelivery] = useState("standard");

  // Load cart
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
      console.error("Could not load checkout cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Group cart products
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

  // Calculate totals
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping =
    delivery === "standard"
      ? subtotal === 0 || subtotal >= 250
        ? 0
        : 15
      : 30;

  const total = subtotal + shipping;

  const updateField = (
    field: keyof CheckoutForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const orderNumber = `AUR-${Date.now()
      .toString()
      .slice(-8)}`;

    const order = {
      orderNumber,
      customer: form,
      delivery,
      items: cartItems,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "aurelia-last-order",
      JSON.stringify(order)
    );

    localStorage.removeItem("aurelia-cart");

    window.dispatchEvent(
      new Event("aurelia-cart-updated")
    );

    window.location.href = `/order-confirmation?order=${orderNumber}`;
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
        <div className="h-[76px]" />

        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
            Preparing your checkout...
          </p>
        </div>
      </main>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
        <div className="h-[76px]" />

        <section className="flex min-h-[650px] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
              <ShoppingBag size={24} strokeWidth={1.2} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              AURELIA / Checkout
            </p>

            <h1 className="mt-5 text-4xl font-light tracking-[-0.04em]">
              Your bag is empty.
            </h1>

            <p className="mt-5 text-sm leading-7 text-black/50">
              Add a few carefully selected pieces before
              continuing to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
            >
              Explore the Shop
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-18 lg:px-12">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-black/45 transition hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to Shopping Bag
          </Link>

          <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">
            AURELIA / Checkout
          </p>

          <h1 className="mt-5 text-5xl font-light tracking-[-0.05em] md:text-7xl">
            Order Details
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-black/50">
            Complete your details below and prepare your
            carefully selected pieces for delivery.
          </p>
        </div>
      </section>

      {/* Checkout */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16 lg:px-12">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-12 lg:grid-cols-[1fr_390px] lg:gap-20">
            {/* Form */}
            <div>
              {/* Contact */}
              <section>
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                    01
                  </span>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                      Step One
                    </p>

                    <h2 className="mt-1 text-2xl font-light">
                      Contact Information
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                      First Name
                    </span>

                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(event) =>
                        updateField("firstName", event.target.value)
                      }
                      required
                      className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      placeholder="Your first name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                      Last Name
                    </span>

                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(event) =>
                        updateField("lastName", event.target.value)
                      }
                      required
                      className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      placeholder="Your last name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                      Email Address
                    </span>

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      required
                      className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                      Phone Number
                    </span>

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      required
                      className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      placeholder="+94 77 123 4567"
                    />
                  </label>
                </div>
              </section>

              {/* Shipping */}
              <section className="mt-16 border-t border-black/10 pt-12">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                    02
                  </span>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                      Step Two
                    </p>

                    <h2 className="mt-1 text-2xl font-light">
                      Shipping Address
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                      Address
                    </span>

                    <input
                      type="text"
                      value={form.address}
                      onChange={(event) =>
                        updateField("address", event.target.value)
                      }
                      required
                      className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      placeholder="Street address"
                    />
                  </label>

                  <div className="grid gap-5 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                        City
                      </span>

                      <input
                        type="text"
                        value={form.city}
                        onChange={(event) =>
                          updateField("city", event.target.value)
                        }
                        required
                        className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                        placeholder="City"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                        Postal Code
                      </span>

                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(event) =>
                          updateField(
                            "postalCode",
                            event.target.value
                          )
                        }
                        required
                        className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                        placeholder="Postal code"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-black/45">
                        Country
                      </span>

                      <input
                        type="text"
                        value={form.country}
                        onChange={(event) =>
                          updateField(
                            "country",
                            event.target.value
                          )
                        }
                        required
                        className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-black"
                      />
                    </label>
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section className="mt-16 border-t border-black/10 pt-12">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                    03
                  </span>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                      Step Three
                    </p>

                    <h2 className="mt-1 text-2xl font-light">
                      Delivery
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  <label className="cursor-pointer border border-black/15 p-5 transition hover:border-black/40">
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={delivery === "standard"}
                        onChange={() =>
                          setDelivery("standard")
                        }
                        className="mt-1"
                      />

                      <div className="flex flex-1 items-start justify-between gap-4">
                        <div>
                          <p className="text-sm">
                            Standard Delivery
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-black/45">
                            Delivered within 3–5 business days.
                          </p>
                        </div>

                        <span className="text-sm">
                          {subtotal >= 250
                            ? "Free"
                            : "$15.00"}
                        </span>
                      </div>
                    </div>
                  </label>

                  <label className="cursor-pointer border border-black/15 p-5 transition hover:border-black/40">
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={delivery === "express"}
                        onChange={() =>
                          setDelivery("express")
                        }
                        className="mt-1"
                      />

                      <div className="flex flex-1 items-start justify-between gap-4">
                        <div>
                          <p className="text-sm">
                            Express Delivery
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-black/45">
                            Priority delivery within 1–2 business days.
                          </p>
                        </div>

                        <span className="text-sm">
                          $30.00
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              {/* Payment note */}
              <section className="mt-16 border-t border-black/10 pt-12">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                    04
                  </span>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                      Final Step
                    </p>

                    <h2 className="mt-1 text-2xl font-light">
                      Payment
                    </h2>
                  </div>
                </div>

                <div className="mt-8 border border-black/10 bg-[#e9e4da] p-6">
                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15">
                      <Check size={16} strokeWidth={1.5} />
                    </div>

                    <div>
                      <p className="text-sm">
                        Secure demo checkout
                      </p>

                      <p className="mt-2 text-[11px] leading-6 text-black/50">
                        This portfolio checkout demonstrates
                        the complete order experience. No real
                        payment will be processed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mobile place order */}
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center gap-3 bg-[#171717] py-5 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80 lg:hidden"
              >
                Place Order
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Order Summary */}
            <aside className="h-fit bg-[#e9e4da] p-7 md:p-9 lg:sticky lg:top-[100px]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/45">
                Your Order
              </p>

              <div className="mt-7 space-y-5 border-b border-black/10 pb-7">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#ddd5c9]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center bg-[#171717] px-1 text-[8px] text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 justify-between gap-3">
                      <div>
                        <p className="text-xs">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-black/40">
                          {item.category}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-xs">
                        $
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-4 border-b border-black/10 pb-7">
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">
                    Subtotal
                  </span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-black/50">
                    Delivery
                  </span>

                  <span>
                    {shipping === 0
                      ? "Complimentary"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  Total
                </span>

                <span className="text-xl font-light">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-8 hidden w-full items-center justify-center gap-3 bg-[#171717] py-5 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80 lg:flex"
              >
                Place Order
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-black/40">
                <ShoppingBag size={13} strokeWidth={1.5} />
                Secure checkout
              </div>

              <p className="mt-5 text-center text-[9px] leading-5 text-black/40">
                Free standard delivery on orders over $250.
              </p>
            </aside>
          </div>
        </form>
      </section>
    </main>
  );
}

