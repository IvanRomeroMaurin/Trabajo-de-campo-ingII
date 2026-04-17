'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '0.75rem', 
      marginBottom: '2.5rem', 
      overflowX: 'auto', 
      paddingBottom: '0.5rem',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '50px',
              border: '1px solid',
              borderColor: isActive ? 'var(--accent-purple)' : 'var(--border-subtle)',
              background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'rgba(0, 0, 0, 0.04)',
              color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
