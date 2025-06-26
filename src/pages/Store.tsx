import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

axios.defaults.withCredentials = true;

interface InventoryItem {
  id: string;
  hidden: boolean;
  available: boolean;
  autoManage: boolean;
  name: string;
  code: number;
  price: number;
  priceType: string;
  defaultTaxRates: boolean;
  isRevenue: boolean;
  categories: string[];
  modifiedTime: number;
}

const Store = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  // const [selected, setSelected] = useState("");

  const handleFilter = async (filter: string) => {
    try {
      let url = "http://localhost:3000/inventory";

      if (filter) {
        url += `?categories_filter=${filter.toLowerCase()}`;
      }

      console.log("filtered url:", url);

      const response = await fetch(url);
      const data = await response.json();
      setItems(data.ret_arr);

      console.log("Response data:", data.ret_arr);
    } catch (error) {
      console.log("Error while fetching inventory:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h2 className="heading text-center">Storefront</h2>
      <div className="flex min-h-screen justify-center">
        <div className="flex w-1/4 bg-gray-200 justify-center">
          <CategoryFilter onFilterChange={handleFilter} />
        </div>
        <div className="subheading grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4 h-full px-5 py-8 place-items-center-safe">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={(item.price * 0.01).toFixed(2)}
              available={item.available}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
