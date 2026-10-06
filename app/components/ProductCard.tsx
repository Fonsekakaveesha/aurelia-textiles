"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-[#e8e1d7]">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em]">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-105"
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            fill={liked ? "#171717" : "none"}
          />
        </button>

        <Link
          href={`/product/${product.id}`}
          className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-4 items-center justify-center rounded-full bg-[#171717] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8a8176]">
            {product.category}
          </p>

          <h3 className="mt-2 text-sm font-medium text-[#171717]">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-[#3b3732]">${product.price}</p>
      </div>
    </article>
  );
}