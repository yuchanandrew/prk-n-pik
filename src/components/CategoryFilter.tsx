/* Add an interface for onFilterChange declared in parent */
interface CategoryFilterProps {
  onFilterChange: (category: string) => void;
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  const categories = [
    "All",
    "Chai",
    "Classic Brew",
    "Espresso",
    "Matcha",
    "Mocha",
    "Thai",
  ];
  return (
    <div className="w-full h-auto flex flex-col subheading space-y-4">
      {categories.map((category) => (
        <button
          key={category}
          className="py-2 hover-primary"
          onClick={() => {
            onFilterChange(category);
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
