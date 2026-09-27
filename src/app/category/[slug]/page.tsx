"use client";

import { use } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Header } from "@/components/Header";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { category, products, loading, error } = useCategoryProducts(slug);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8">Error: {error.message}</p>;
  if (!category) return <p className="p-8">Category not found.</p>;

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14">
        <div className="mb-10">
          <span className="block text-accent text-xs font-semibold mb-2">
            {category.product_count} PRODUCTS
          </span>
          <h1 className="text-3xl md:text-4xl">{category.name}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product?.id}
              name={product?.name}
              imageUrl={product?.small_image?.url}
              price={product?.price_range?.minimum_price?.regular_price?.value}
              currency={product?.price_range?.minimum_price?.regular_price?.currency}
            />
          ))}
        </div>
      </section>
    </>
  );
}