'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-5 py-2.5 rounded-full border text-xs font-bold cursor-pointer whitespace-nowrap transition-all duration-200
              ${isActive 
                ? 'border-sky-500 bg-sky-500/10 text-sky-500' 
                : 'border-slate-200 bg-black/5 text-slate-600 hover:border-slate-400'
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
