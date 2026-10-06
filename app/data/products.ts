export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "silk-drape",
    name: "Silk Drape",
    category: "Women",
    price: 185,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A fluid silk textile with a soft hand-feel and elegant natural movement.",
    badge: "New",
  },
  {
    id: "linen-studio",
    name: "Linen Studio Shirt",
    category: "Men",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85",
    description:
      "Lightweight European-inspired linen designed for effortless everyday wear.",
  },
  {
    id: "soft-weave",
    name: "Soft Weave",
    category: "Living",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
    description:
      "A warm woven textile designed to bring understated texture into your space.",
  },
  {
    id: "sand-cotton",
    name: "Sand Cotton",
    category: "Women",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
    description:
      "A breathable cotton textile with a relaxed silhouette and timeless tone.",
  },
  {
    id: "heritage-knit",
    name: "Heritage Knit",
    category: "Men",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=85",
    description:
      "Textured knitwear inspired by traditional craftsmanship and modern tailoring.",
  },
  {
    id: "ivory-home",
    name: "Ivory Home",
    category: "Kids",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=85",
    description:
      "Soft neutral textile accents crafted for calm and contemporary interiors.",
  },
];