import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
