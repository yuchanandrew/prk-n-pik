import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProductProperties {
  id: string;
  name: string;
  price: number;
  availability: boolean;
}

const ProductPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    price: 0,
  });
  const [content, setContent] = useState({
    clover_id: "",
    image_url: "",
    description: "",
  });

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventory/${id}`);
      const data = await response.json();

      const retrieved_item = data.item;
      const retrieved_content = data.content[0];

      console.log("content.clover_id:", retrieved_content.clover_id);

      setItem(retrieved_item);
      setContent(retrieved_content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-5">
      <div className="flex w-full bg-gray-200 min-h-screen">
        <img
          src={content.image_url}
          alt="placeholder"
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col bg-gray-200 w-full items-center space-y-6 lg:w-1/2">
        <h2 className="subheading flex">{item.name}</h2>
        <p className="flex">${(item.price / 100).toFixed(2)}</p>
        <p className="flex w-11/12">{content.description}</p>
        <p className="flex subheading">Free pickup in store</p>
        <div className="flex w-11/12">
          <button className="subheading hover-primary w-full py-5">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
