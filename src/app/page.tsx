"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/lib/graphql/queries";

export default function Home() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p className="p-8">Loading categories...</p>;
  if (error) return <p className="p-8">Error: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Loom Categories</h1>
      <ul className="space-y-2">
        {data?.categoryList?.map((category: { id: string; name: string; product_count: number }) => (
          <li key={category.id} className="border p-3 rounded">
            {category.name} — {category.product_count} products
          </li>
        ))}
      </ul>
    </main>
  );
}