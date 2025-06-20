import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="">
      <button className="hover-primary shadow px-3 py-2 rounded grid grid-cols-2 justify-items-center">
        <div className="text-2xl">
          <FaShoppingCart />
        </div>
        {/*Replace with quantity of items*/}
        <div className="flex text-xl">(0)</div>
      </button>
    </div>
  );
};

export default Cart;
