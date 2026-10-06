import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Women",
    number: "01",
    description:
      "Fluid silhouettes, refined textures and effortless pieces designed for modern femininity.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90",
  },
  {
    name: "Men",
    number: "02",
    description:
      "Quiet tailoring, natural fabrics and timeless essentials created for understated confidence.",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1600&q=90",
  },
  {
    name: "Kids",
    number: "03",
    description:
      "Soft textures, comfortable silhouettes and timeless essentials made for little moments.",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1600&q=90",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      {/* Navbar spacing */}
      <div className="h-[76px]" />

      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-black/45">
            AURELIA / Collections
          </p>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h1 className="max-w-4xl text-5xl font-light leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              Collections
              <br />
              with intention.
            </h1>

            <p className="max-w-md text-sm leading-7 text-black/55">
              Explore the world of AURELIA through carefully
              curated collections created around timeless
              silhouettes, considered materials and quiet
              elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="space-y-20 md:space-y-28">
          {collections.map((collection, index) => (
            <article
              key={collection.name}
              className="group"
            >
              <div
                className={`grid overflow-hidden bg-[#e9e4da] lg:grid-cols-2 ${
                  index % 2 === 1
                    ? "lg:[&>div:first-child]:order-2"
                    : ""
                }`}
              >
                {/* Image */}
                <Link
                  href={`/shop?category=${collection.name}`}
                  className="relative block overflow-hidden"
                >
                  <div className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]">
                    <img
                      src={collection.image}
                      alt={`${collection.name} collection`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <span className="absolute left-5 top-5 bg-[#f7f4ee] px-3 py-1.5 text-[8px] uppercase tracking-[0.2em]">
                    Collection {collection.number}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex min-h-[400px] flex-col justify-center px-8 py-12 md:px-14 lg:px-20">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
                    AURELIA / {collection.number}
                  </p>

                  <h2 className="mt-5 text-5xl font-light tracking-[-0.04em] md:text-6xl">
                    {collection.name}
                  </h2>

                  <p className="mt-7 max-w-sm text-sm leading-7 text-black/55">
                    {collection.description}
                  </p>

                  <Link
                    href={`/shop?category=${collection.name}`}
                    className="mt-9 inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-[10px] uppercase tracking-[0.2em] transition-all"
                  >
                    Explore {collection.name}
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
                The AURELIA Philosophy
              </p>

              <h2 className="mt-6 max-w-2xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
                Fewer pieces.
                <br />
                Better choices.
              </h2>
            </div>

            <div>
              <p className="max-w-md text-sm leading-7 text-black/55">
                AURELIA is built around the idea that style
                does not need to be loud. Every piece is
                selected to live beyond a season and become
                part of a wardrobe that feels entirely your
                own.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]"
              >
                Discover Our Story
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-24 text-center md:py-32">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          AURELIA
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
          Find what feels
          <br />
          unmistakably you.
        </h2>

        <Link
          href="/shop"
          className="mt-9 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
        >
          Shop All Pieces
          <ArrowRight
            size={15}
            strokeWidth={1.5}
          />
        </Link>
      </section>
    </main>
  );
}