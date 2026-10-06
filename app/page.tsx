"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

const products = [
  {
    id: "linen-shirt",
    name: "Relaxed Linen Shirt",
    price: "$148",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "wool-coat",
    name: "Tailored Wool Coat",
    price: "$420",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "cotton-throw",
    name: "Organic Cotton Throw",
    price: "$185",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzuAHxyEpckpKWVgKs7R_7nHHgolhGn793DMC3smkOg&s=10",
  },
];

export default function Home() {
  return (
    <main className="bg-[#f7f4ee] text-[#171717]">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#d8cec0] pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2200&q=90"
            alt="Premium textile"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-[1440px] items-end px-6 pb-12 md:px-10 lg:px-14 lg:pb-16">
          <div className="max-w-3xl text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-xs uppercase tracking-[0.35em] text-white/80"
            >
              A contemporary textile house
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="max-w-4xl text-6xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[110px]"
            >
              Woven for
              <br />
              <span className="font-serif italic">
                the extraordinary.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-5 bg-white px-7 py-4 text-xs uppercase tracking-[0.18em] text-[#171717] transition-all hover:bg-[#171717] hover:text-white"
              >
                Discover collection

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <span className="text-xs tracking-wide text-white/75">
                AW / 2026
              </span>
            </motion.div>
          </div>

          <div className="absolute bottom-10 right-10 hidden items-center gap-3 text-white/70 lg:flex">
            <span className="text-[10px] uppercase tracking-[0.2em]">
              Scroll to explore
            </span>

            <ArrowDown size={15} />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-28 md:px-10 lg:px-14 lg:py-40">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a8176]">
              01 — Our philosophy
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-7xl">
              Textiles with a sense of{" "}
              <span className="font-serif italic">
                place, purpose
              </span>{" "}
              and permanence.
            </h2>

            <p className="mt-9 max-w-xl text-sm leading-7 text-[#706a62]">
              AURELIA brings together refined materials, thoughtful
              design and modern craftsmanship to create pieces that
              feel relevant today and beautiful for years to come.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#171717] pb-2 text-xs uppercase tracking-[0.16em]"
            >
              Our story
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-[#1a1917] px-6 py-28 text-[#f7f4ee] md:px-10 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaa095]">
                02 — Explore
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Collections
              </h2>
            </div>

            <Link
              href="/collections"
              className="hidden items-center gap-3 text-xs uppercase tracking-[0.15em] md:flex"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Women",
                image:
                  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
              },
              {
                title: "Men",
                image:
                  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85",
              },
              {
                title: "Kids",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40k5pb70j9HuvHt-lHRGWvhAcPLmoB2P7Ewq4ZofHC_EepKESWFNLtuhj&s=10",
              },
            ].map((item, index) => (
              <Link
                href={`/shop?category=${item.title}`}
                key={item.title}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-3xl font-light">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-28 md:px-10 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a8176]">
                03 — New arrivals
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Just in
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden items-center gap-3 text-xs uppercase tracking-[0.15em] md:flex"
            >
              Shop all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id}>
                <Link href="/shop" className="group block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h3 className="text-sm">
                      {product.name}
                    </h3>

                    <span className="text-sm">
                      {product.price}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="grid min-h-[700px] bg-[#ded5c8] lg:grid-cols-2">
        <div className="relative min-h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=90"
            alt="AURELIA craftsmanship"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

        <div className="flex items-center px-8 py-20 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <Sparkles size={20} strokeWidth={1.3} />

            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#756d63]">
              The AURELIA standard
            </p>

            <h2 className="mt-6 text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">
              Made slowly.
              <br />
              <span className="font-serif italic">
                Made beautifully.
              </span>
            </h2>

            <p className="mt-8 text-sm leading-7 text-[#645d55]">
              We believe the finest textiles should reward attention.
              Every texture, weight and finish is selected to create
              an experience that goes beyond appearance.
            </p>

            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#171717] pb-2 text-xs uppercase tracking-[0.15em]"
            >
              Discover our craft
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-32 text-center md:px-10 lg:py-44">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a8176]">
          AURELIA / 2026
        </p>

        <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
          Discover a more considered way to wear and live.
        </h2>

        <Link
          href="/shop"
          className="mt-10 inline-flex items-center gap-4 bg-[#171717] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-1"
        >
          Shop now
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}