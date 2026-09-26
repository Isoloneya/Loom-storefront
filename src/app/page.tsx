"use client";

import { useCategories } from "@/hooks/useCategories";
import { CategoryList } from "@/components/catalog/CategoryList";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  const { categories, loading, error } = useCategories();

  if (loading) return <p className="p-8">Loading categories...</p>;
  if (error) return <p className="p-8">Error: {error.message}</p>;

  const gearCategory = categories.find((c) => c?.name === "Gear");
  const gearCount = gearCategory?.product_count ?? 0;

  return (
    <>
      <Header />
      <Hero gearCount={gearCount} categoryCount={categories.length} />

      <section className="px-6 md:px-12 py-14 md:py-18 border-b border-line">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-2">
          <div>
            <span className="block text-accent text-xs font-semibold mb-2">
              BROWSE
            </span>
            <h2 className="text-2xl md:text-[28px]">Shop by category</h2>
          </div>
          <a href="#" className="text-muted text-sm">
            View all →
          </a>
        </div>

        <CategoryList categories={categories} />
      </section>
    </>
  );
}