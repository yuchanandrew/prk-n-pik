import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  available: boolean;
}

const ProductCard = ({ id, name, price, available }: ProductCardProps) => {
  const [dbProduct, setDbProduct] = useState({
    clover_id: "",
    image_url: "",
    description: "",
  });

  const getImage = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventory/${id}`);
      const data = await response.json();

      const product = data.content[0];
      setDbProduct(product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="flex flex-col shadow-lg rounded bg-gray-200 space-y-6 w-full justify-center py-8 hover-general">
      <div className="flex justify-center items-center">
        <Link to={`/item/${id}`} className="flex text-center">
          {name}
        </Link>
      </div>
      <div className="flex w-full h-auto justify-center">
        <img src={dbProduct.image_url} alt={name} className="rounded p-4" />
      </div>
      <div className="text-center">
        <p>${price}</p>
      </div>
      <div className="text-center">
        <p>{available}</p>
      </div>
    </div>
  );
};

export default ProductCard;
