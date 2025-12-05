import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK_PRODUCTS = [
  {
    id: "sample-1",
    title: "Everyday Backpack",
    description: "Durable canvas backpack with padded laptop sleeve and quick-access pockets.",
    brand: "Canvas & Co.",
    price: 79.99,
    discountPercentage: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1514477917009-389c76a86b68?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sample-2",
    title: "Wireless Earbuds",
    description: "Noise-isolating earbuds with 24-hour battery life and wireless charging case.",
    brand: "SonicPulse",
    price: 129,
    discountPercentage: 12,
    thumbnail:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sample-3",
    title: "Stainless Water Bottle",
    description: "Vacuum-insulated bottle keeps drinks cold for 24h or hot for 12h.",
    brand: "Summit Gear",
    price: 29,
    discountPercentage: 8,
    thumbnail:
      "https://images.unsplash.com/photo-1526404079160-3c5b96c1c611?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sample-4",
    title: "Ceramic Mug Set",
    description: "Set of 2 hand-glazed ceramic mugs with ergonomic handles.",
    brand: "Hearthstone",
    price: 34,
    discountPercentage: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const loadProducts = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://dummyjson.com/products", { signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const items = Array.isArray(data?.products) ? data.products : [];
        if (!isMounted.current || signal?.aborted) return;
        setProducts(items);
      } catch (err) {
        if (!isMounted.current || signal?.aborted) return;
        console.error("Failed to load products", err);
        setError("Couldn't refresh products. Showing sample data instead.");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        if (!isMounted.current || signal?.aborted) return;
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [loadProducts]);

  const retry = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, retry };
}
