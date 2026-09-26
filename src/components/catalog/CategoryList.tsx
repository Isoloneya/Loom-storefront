type Category = {
  id?: number | null;
  name?: string | null;
  product_count?: number | null;
};

type CategoryListProps = {
  categories: Category[];
};

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((category) => (
        <a
          key={category.id}
          href="#"
          className="group bg-panel border border-line rounded-md p-6 min-h-[200px] flex flex-col justify-between hover:bg-panel-2 hover:border-[#333338] transition"
        >
          <div className="text-muted text-sm">
            {category.product_count} products
          </div>
          <div className="font-display font-bold text-xl md:text-2xl">
            {category.name}
          </div>
          <div className="text-accent text-lg group-hover:translate-x-1 group-hover:text-cold transition">
            →
          </div>
        </a>
      ))}
    </div>
  );
}