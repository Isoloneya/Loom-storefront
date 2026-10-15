"use client";

import { use, useState } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Header } from "@/components/Header";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const [pagination, setPagination] = useState({ slug, page: 1 });
  const page = pagination.slug === slug ? pagination.page : 1;
  const setPage = (page: number) => setPagination({ slug, page });
  const { category, products, totalPages, totalCount, loading, error } = useCategoryProducts(slug, page);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8">Error: {error.message}</p>;
  if (!category) return <p className="p-8">Category not found.</p>;

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14">
        <div className="mb-10">
          <span className="block text-accent text-xs font-semibold mb-2">
            {totalCount} PRODUCTS
          </span>
          <h1 className="text-3xl md:text-4xl">{category.name}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
        <ProductCard
            key={product?.id}
            name={product?.name}
            urlKey={product?.url_key}
            imageUrl={product?.small_image?.url}
            price={product?.price_range?.minimum_price?.final_price?.value}
            regularPrice={product?.price_range?.minimum_price?.regular_price?.value}
            currency={product?.price_range?.minimum_price?.regular_price?.currency}
        />
          ))}
        </div>
        {totalPages > 1 && (
          <nav aria-label="Product pages" className="flex items-center justify-center gap-6 mt-10">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="border border-line rounded-md px-4 py-2 disabled:opacity-30">Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="border border-line rounded-md px-4 py-2 disabled:opacity-30">Next</button>
          </nav>
        )}
      </section>
    </>
  );
}
