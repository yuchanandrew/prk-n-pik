interface ProductCardProps {
  name: string;
  price: number;
  available: boolean;
}

const ProductCard = ({ name, price, available }: ProductCardProps) => {
  return (
    <div className="flex flex-col shadow-lg rounded bg-gray-200 space-y-6 w-full justify-center p-2 hover-general">
      <div>
        <h2 className="text-center">{name}</h2>
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
