type ProductCardProps = {
  name?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  currency?: string | null;
};

export function ProductCard({ name, imageUrl, price, currency }: ProductCardProps) {
  return (
    <a href="#" className="block">
      <div className="bg-gradient-to-br from-[#dedad1] to-[#eeeceb] aspect-[3/4] rounded-md mb-3.5 flex items-center justify-center text-[#a19d92] text-xs overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name ?? ""} className="w-full h-full object-cover" />
        ) : (
          "Product image"
        )}
      </div>
      <div className="text-sm font-medium mb-1">{name}</div>
      <div className="text-muted text-sm">
        {currency} {price?.toFixed(2)}
      </div>
    </a>
  );
}