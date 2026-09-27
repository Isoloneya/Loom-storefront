"use client";

import { use } from "react";
import Image from "next/image";
import { useProduct } from "@/hooks/useProduct";
import { Header } from "@/components/Header";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const { product, loading, error } = useProduct(slug);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8">Error: {error.message}</p>;
  if (!product) return <p className="p-8">Product not found.</p>;

  const price = product.price_range?.minimum_price?.regular_price?.value;
  const currency = product.price_range?.minimum_price?.regular_price?.currency;
  const image = product.media_gallery?.[0]?.url;

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative bg-gradient-to-br from-[#dedad1] to-[#eeeceb] aspect-[3/4] rounded-md flex items-center justify-center text-[#a19d92] text-sm overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.name ?? ""}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            "Product image"
          )}
        </div>

        <div className="flex flex-col justify-center max-w-md">
          {product.categories?.[0] && (
            <span className="text-accent text-xs font-semibold mb-3">
              {product.categories[0]?.name?.toUpperCase()}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

          <div className="text-2xl text-muted mb-8">
            {currency} {price?.toFixed(2)}
          </div>

          {product.short_description?.html && (
            <p
              className="text-muted leading-relaxed mb-10"
              dangerouslySetInnerHTML={{
                __html: product.short_description.html,
              }}
            />
          )}

          <button className="bg-accent text-cream rounded-md px-8 py-4 text-sm font-semibold w-fit">
            Add to Cart
          </button>
        </div>
      </section>
    </>
  );
}