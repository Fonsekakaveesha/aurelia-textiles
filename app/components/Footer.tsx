"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-black/10 bg-[#171717] text-[#f7f4ee]">
      {/* NEWSLETTER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-white/40">
                AURELIA / Newsletter
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.05em] md:text-6xl">
                Stay close to
                <br />
                <span className="italic text-white/45">
                  what comes next.
                </span>
              </h2>
            </div>

            <div>
              <p className="mb-7 max-w-md text-sm leading-7 text-white/50">
                Receive new collection updates, seasonal stories and
                occasional notes from AURELIA.
              </p>

              {subscribed ? (
                <div className="border-b border-white/30 pb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Thank you. You are now subscribed.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex border-b border-white/30"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="submit"
                    className="group flex items-center gap-3 py-4 pl-5 text-[9px] uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
                  >
                    Subscribe
                    <ArrowRight
                      size={15}
                      strokeWidth={1.3}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr]">
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="text-2xl font-medium tracking-[0.3em]"
              >
                AURELIA
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
                Contemporary fashion shaped by timeless silhouettes,
                considered materials and quiet confidence.
              </p>

              <p className="mt-8 text-[9px] uppercase tracking-[0.25em] text-white/30">
                Designed for the quietly confident.
              </p>
            </div>

            {/* SHOP */}
            <div>
              <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-white/35">
                Shop
              </p>

              <nav className="flex flex-col items-start gap-4">
                <Link
                  href="/shop?category=Women"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Women
                </Link>

                <Link
                  href="/shop?category=Men"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Men
                </Link>

                <Link
                  href="/shop?category=Kids"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Kids
                </Link>

                <Link
                  href="/shop"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  New Arrivals
                </Link>
              </nav>
            </div>

            {/* INFORMATION */}
            <div>
              <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-white/35">
                Information
              </p>

              <nav className="flex flex-col items-start gap-4">
                <Link
                  href="/about"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  About
                </Link>

                <Link
                  href="/collections"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Collections
                </Link>

                <Link
                  href="/cart"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Shopping Bag
                </Link>

                <Link
                  href="/wishlist"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Wishlist
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
            © 2026 AURELIA. All rights reserved.
          </p>

          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
            Crafted with intention.
          </p>
        </div>
      </section>
    </footer>
  );
}