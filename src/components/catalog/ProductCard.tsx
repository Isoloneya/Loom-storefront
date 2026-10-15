import Link from "next/link";

type ProductCardProps = {
  name?: string | null;
  urlKey?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  regularPrice?: number | null;
  currency?: string | null;
};

export function ProductCard({ name, urlKey, imageUrl, price, regularPrice, currency }: ProductCardProps) {
  const discounted = price != null && regularPrice != null && price < regularPrice;
  return (
    <Link href={`/product/${urlKey}`} className="group block">
      <div className="relative bg-[#e5e2dd] aspect-[3/4] rounded-md mb-3.5 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name ?? ""} loading="lazy" width={600} height={800} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
        ) : <span className="flex h-full items-center justify-center text-muted text-sm">Image unavailable</span>}
        {discounted && <span className="absolute top-3 left-3 rounded bg-accent px-2 py-1 text-xs font-semibold text-cream">−{Math.round((1 - price / regularPrice) * 100)}%</span>}
      </div>
      <div className="text-sm font-medium mb-1">{name}</div>
      <div className="flex gap-2 text-muted text-sm">
        <span className={discounted ? "text-accent" : ""}>{currency} {price?.toFixed(2)}</span>
        {discounted && <del>{currency} {regularPrice.toFixed(2)}</del>}
      </div>
    </Link>
  );
}
