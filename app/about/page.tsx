"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4ee] text-[#171717]">
      {/* NAVBAR SPACE */}
      <div className="h-[76px]" />

      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="grid min-h-[calc(100vh-76px)] items-center py-20 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-16">
            {/* LEFT */}
            <div>
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-10 bg-black/30" />

                <p className="text-[9px] uppercase tracking-[0.32em] text-black/45">
                  AURELIA / Our Story
                </p>
              </div>

              <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,8.5rem)] font-light leading-[0.86] tracking-[-0.065em]">
                Designed
                <br />
                for the
                <br />
                <span className="italic">quietly confident.</span>
              </h1>

              <div className="mt-12 flex items-start gap-8">
                <span className="hidden text-[9px] uppercase tracking-[0.25em] text-black/35 sm:block">
                  01 / 06
                </span>

                <div className="max-w-md">
                  <p className="text-sm leading-7 text-black/55 md:text-[15px]">
                    A contemporary fashion house built around timeless
                    design, considered materials and the belief that
                    true style never needs to shout.
                  </p>

                  <Link
                    href="#story"
                    className="mt-8 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.25em]"
                  >
                    Discover our story
                    <ArrowDown
                      size={14}
                      strokeWidth={1.4}
                      className="animate-bounce"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative mt-12 lg:mt-0">
              <div className="absolute -right-3 -top-3 h-full w-full border border-black/10 md:-right-5 md:-top-5" />

              <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e1d7]">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90"
                  alt="AURELIA fashion editorial"
                  className="h-full w-full object-cover transition duration-1000 hover:scale-[1.04]"
                />

                <div className="absolute bottom-5 left-5 bg-[#f7f4ee]/90 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[8px] uppercase tracking-[0.25em]">
                    AURELIA / 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28">
            {/* LABEL */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-black/40">
                01 / Our Philosophy
              </p>

              <div className="mt-10 hidden h-20 w-px bg-black/15 lg:block" />
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="max-w-5xl text-4xl font-light leading-[0.98] tracking-[-0.05em] md:text-6xl lg:text-7xl">
                We believe in
                <br />
                <span className="text-black/35">less, but better.</span>
              </h2>

              <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
                <p className="text-sm leading-7 text-black/55">
                  AURELIA was created around a simple idea: a wardrobe
                  should feel personal, effortless and enduring.
                  Instead of chasing every passing trend, we focus on
                  pieces that continue to feel relevant long after a
                  season has ended.
                </p>

                <p className="text-sm leading-7 text-black/55">
                  Every silhouette is considered. Every texture has a
                  purpose. Every detail is intentionally restrained,
                  allowing the person wearing it to remain at the
                  centre of the story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LARGE EDITORIAL IMAGE */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="group relative overflow-hidden bg-[#e8e2d8]">
          <div className="aspect-[16/8]">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90"
              alt="AURELIA fashion collection"
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]"
            />
          </div>

          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
            <p className="bg-[#f7f4ee]/90 px-4 py-2 text-[8px] uppercase tracking-[0.25em] backdrop-blur-sm">
              The Art of Everyday
            </p>
          </div>

          <div className="absolute right-5 top-5 md:right-8 md:top-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white">
              <ArrowDown size={15} strokeWidth={1.3} />
            </span>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40">
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-black/40">
                02 / What Matters
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.05em] md:text-6xl lg:text-7xl">
                Thoughtful
                <br />
                <span className="italic">by design.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-black/50 lg:justify-self-end">
              We approach fashion with restraint, choosing quality,
              versatility and lasting relevance over excess.
            </p>
          </div>

          <div className="grid border-t border-black/10 md:grid-cols-3">
            {/* VALUE 01 */}
            <div className="group border-b border-black/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] text-black/35">
                  01
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-14 text-2xl font-light tracking-[-0.03em] md:text-3xl">
                Timeless
                <br />
                Design
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-black/50">
                Clean silhouettes and understated details designed
                to move effortlessly through seasons and occasions.
              </p>
            </div>

            {/* VALUE 02 */}
            <div className="group border-b border-black/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] text-black/35">
                  02
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-14 text-2xl font-light tracking-[-0.03em] md:text-3xl">
                Considered
                <br />
                Materials
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-black/50">
                We focus on fabrics and textures that feel beautiful,
                comfortable and worthy of becoming wardrobe staples.
              </p>
            </div>

            {/* VALUE 03 */}
            <div className="group py-10 md:px-8 md:py-12 md:pr-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] text-black/35">
                  03
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              <h3 className="mt-14 text-2xl font-light tracking-[-0.03em] md:text-3xl">
                Intentional
                <br />
                Living
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-black/50">
                Fashion should complement your life, not compete
                with it. We create pieces that make everyday
                dressing feel effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          {/* IMAGE */}
          <div className="group relative min-h-[560px] overflow-hidden bg-[#e8e2d8] lg:min-h-[760px]">
            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1500&q=90"
              alt="AURELIA clothing detail"
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]"
            />

            <div className="absolute left-6 top-6">
              <p className="bg-[#f7f4ee]/90 px-4 py-2 text-[8px] uppercase tracking-[0.25em] backdrop-blur-sm">
                Detail / Form / Texture
              </p>
            </div>
          </div>

          {/* TEXT */}
          <div className="flex items-center px-7 py-24 md:px-14 md:py-32 lg:px-20">
            <div className="max-w-xl">
              <p className="text-[9px] uppercase tracking-[0.32em] text-black/40">
                03 / The AURELIA Way
              </p>

              <h2 className="mt-7 text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-6xl">
                Style that
                <br />
                <span className="italic text-black/45">
                  stays with you.
                </span>
              </h2>

              <div className="mt-10 h-px w-16 bg-black/20" />

              <p className="mt-10 text-sm leading-7 text-black/55">
                From the first sketch to the final detail, our approach
                is guided by restraint. We create pieces that can be
                worn together, separately and repeatedly — becoming
                part of a wardrobe rather than simply another purchase.
              </p>

              <p className="mt-6 text-sm leading-7 text-black/55">
                AURELIA is for those who appreciate the quiet confidence
                of knowing exactly what belongs in their world.
              </p>

              <Link
                href="/collections"
                className="group mt-10 inline-flex items-center gap-4 border-b border-black/30 pb-3 text-[9px] uppercase tracking-[0.25em]"
              >
                Explore the collections

                <ArrowRight
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5" />

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035]" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-28 text-center md:px-8 md:py-40 lg:px-12 lg:py-48">
          <p className="text-[9px] uppercase tracking-[0.32em] text-black/40">
            04 / Our Manifesto
          </p>

          <h2 className="mx-auto mt-8 max-w-6xl text-[clamp(2.5rem,6vw,6.5rem)] font-light leading-[0.95] tracking-[-0.06em]">
            Elegance is not about
            <br />
            having more.
            <br />
            <span className="italic text-black/40">
              It is about choosing well.
            </span>
          </h2>
        </div>
      </section>

      {/* FINAL IMAGE STRIP */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
          <div className="overflow-hidden bg-[#e8e2d8]">
            <div className="aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90"
                alt="AURELIA editorial"
                className="h-full w-full object-cover transition duration-1000 hover:scale-[1.04]"
              />
            </div>
          </div>
          

          <div className="overflow-hidden bg-[#e8e2d8]">
            <div className="aspect-[16/10] h-full">
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=90"
                alt="AURELIA fashion editorial"
                className="h-full w-full object-cover transition duration-1000 hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-28 text-center md:px-8 md:py-40 lg:px-12 lg:py-48">
          <p className="text-[9px] uppercase tracking-[0.32em] text-black/40">
            05 / Discover AURELIA
          </p>

          <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl lg:text-8xl">
            Find pieces that feel
            <br />
            <span className="italic text-black/45">
              unmistakably you.
            </span>
          </h2>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-4 bg-[#171717] px-8 py-4 text-[9px] uppercase tracking-[0.25em] text-white transition duration-300 hover:bg-black/80"
            >
              Explore Collections

              <ArrowRight
                size={15}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-4 border-b border-black/30 pb-2 text-[9px] uppercase tracking-[0.25em]"
            >
              Shop All Pieces

              <ArrowRight
                size={15}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}