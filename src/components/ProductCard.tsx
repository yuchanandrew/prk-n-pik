import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  available: boolean;
}

const ProductCard = ({ id, name, price, available }: ProductCardProps) => {
  return (
    <div className="flex flex-col shadow-lg rounded bg-gray-200 space-y-6 w-full justify-center py-8 hover-general">
      <div className="flex justify-center items-center">
        <Link to={`/item/${id}`} className="flex text-center">
          {name}
        </Link>
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
