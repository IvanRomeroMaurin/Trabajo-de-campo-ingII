'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 mb-10 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-5 py-2.5 rounded-full border text-[0.85rem] font-bold cursor-pointer whitespace-nowrap transition-all duration-200
              ${isActive 
                ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' 
                : 'border-[var(--border-subtle)] bg-black/5 text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
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
