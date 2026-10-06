
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";

type OrderItem = {
  id: number;
  name: string;
  category: "Women" | "Men" | "Kids";
  price: number;
  image: string;
  quantity: number;
};

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type Order = {
  orderNumber: string;
  customer: Customer;
  delivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder =
        localStorage.getItem("aurelia-last-order");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);

        if (parsedOrder) {
          setOrder(parsedOrder);
        }
      }
    } catch (error) {
      console.error(
        "Could not load order details:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
        <div className="h-[76px]" />

        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
            Preparing your confirmation...
          </p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
        <div className="h-[76px]" />

        <section className="flex min-h-[650px] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
              <Package
                size={24}
                strokeWidth={1.2}
              />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              AURELIA / Order
            </p>

            <h1 className="mt-5 text-4xl font-light tracking-[-0.04em]">
              No order found.
            </h1>

            <p className="mt-5 text-sm leading-7 text-black/50">
              Your order details are not available.
              Please return to the shop and start again.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
            >
              Continue Shopping
              <ArrowRight
                size={15}
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deliveryLabel =
    order.delivery === "express"
      ? "Express Delivery"
      : "Standard Delivery";

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      <div className="h-[76px]" />

      {/* Success Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1000px] px-5 py-20 text-center md:px-8 md:py-28">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#171717] text-white">
            <Check
              size={27}
              strokeWidth={1.4}
            />
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-black/40">
            AURELIA / Thank You
          </p>

          <h1 className="mt-5 text-5xl font-light tracking-[-0.05em] md:text-7xl">
            Order Confirmed.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-black/50">
            Thank you, {order.customer.firstName}.
            Your carefully selected pieces are now
            being prepared for delivery.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 border-y border-black/10 py-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-[8px] uppercase tracking-[0.2em] text-black/35">
                Order Number
              </p>

              <p className="mt-2 text-sm">
                {order.orderNumber}
              </p>
            </div>

            <div className="hidden h-8 w-px bg-black/10 sm:block" />

            <div className="text-center sm:text-right">
              <p className="text-[8px] uppercase tracking-[0.2em] text-black/35">
                Order Date
              </p>

              <p className="mt-2 text-sm">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 border-b border-black/10 pb-6">
              <ShoppingBag
                size={19}
                strokeWidth={1.3}
              />

              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                  Your Selection
                </p>

                <h2 className="mt-1 text-2xl font-light">
                  Order Details
                </h2>
              </div>
            </div>

            <div className="divide-y divide-black/10">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-6 md:gap-6"
                >
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#e9e4da]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 items-start justify-between gap-5">
                    <div>
                      <h3 className="text-sm">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                        {item.category}
                      </p>

                      <p className="mt-4 text-[10px] text-black/45">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm">
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <aside className="h-fit bg-[#e9e4da] p-7 md:p-8">
            <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
              Delivery Details
            </p>

            <div className="mt-6 border-b border-black/10 pb-6">
              <p className="text-sm">
                {order.customer.firstName}{" "}
                {order.customer.lastName}
              </p>

              <p className="mt-3 text-[11px] leading-6 text-black/50">
                {order.customer.address}
                <br />
                {order.customer.city},{" "}
                {order.customer.postalCode}
                <br />
                {order.customer.country}
              </p>

              <p className="mt-4 text-[11px] text-black/50">
                {order.customer.email}
              </p>

              <p className="mt-1 text-[11px] text-black/50">
                {order.customer.phone}
              </p>
            </div>

            <div className="flex items-center justify-between border-b border-black/10 py-6">
              <div>
                <p className="text-sm">
                  {deliveryLabel}
                </p>

                <p className="mt-1 text-[9px] text-black/40">
                  {order.delivery === "express"
                    ? "1–2 business days"
                    : "3–5 business days"}
                </p>
              </div>

              <Package
                size={19}
                strokeWidth={1.3}
              />
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-black/50">
                  Subtotal
                </span>

                <span>
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-black/50">
                  Delivery
                </span>

                <span>
                  {order.shipping === 0
                    ? "Complimentary"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-black/10 pt-5">
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  Total
                </span>

                <span className="text-xl font-light">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Confirmation Note */}
      <section className="border-y border-black/10 bg-[#ded5c8] px-5 py-16 text-center md:py-20">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA / Crafted with intention
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-light leading-tight tracking-[-0.03em] md:text-5xl">
          Your order is on its way to becoming
          something beautifully yours.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-black/50">
          We appreciate your choice and look forward
          to delivering your AURELIA pieces.
        </p>
      </section>

      {/* Actions */}
      <section className="px-5 py-16 text-center md:py-20">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-3 bg-[#171717] px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
          >
            Continue Shopping
            <ArrowRight
              size={15}
              strokeWidth={1.5}
            />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 border border-black/15 px-8 py-4 text-[10px] uppercase tracking-[0.2em] transition hover:border-black"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

