import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface CartProp {
  product_name: string;
  quantity: number;
  image_url: string;
  price: string;
}

const Cart = () => {
  const [isClicked, setIsClicked] = useState(false);

  // const [cart, setCart];

  const handleClick = async () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative hover-primary shadow px-3 py-2 rounded grid grid-cols-2 justify-items-center"
      >
        <div className="text-2xl">
          <FaShoppingCart />
        </div>
        {/*Replace with quantity of items*/}
        <div className="flex text-xl">(0)</div>
      </button>
      {isClicked && (
        <div className="absolute shadow mt-2 rounded bg-gray-200 py-6 px-20 right-0 flex flex-col space-y-6">
          <h1 className="subheading">Cart</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
