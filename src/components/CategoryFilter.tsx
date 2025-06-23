import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const CategoryFilter = () => {
  /* States for each accordion section */
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  /* State handlers for each accordion section */
  const handleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleAvailability = () => {
    setAvailabilityOpen(!availabilityOpen);
  };

  const handlePrice = () => {
    setPriceOpen(!priceOpen);
  };

  /* TO-DO: create a fetch for item filter function from backend */

  return (
    <div className="w-full h-auto">
      <ul className="flex flex-col justify-items-center">
        {/* Handling Categories Accordion */}

        <li className="flex flex-col justify-center">
          <button
            onClick={handleCategories}
            className="flex subheading text-center border w-full py-4"
          >
            Categories {categoriesOpen ? <RxCaretUp /> : <RxCaretDown />}
          </button>
          {categoriesOpen && (
            <div>
              <ul className="space-y-4">
                <li>Classic</li> /* TO-DO: Turn these into buttons to filter */
                <li>Espresso</li>
                <li>Mocha</li>
                <li>Matcha</li>
                <li>Thai</li>
              </ul>
            </div>
          )}
        </li>

        {/* Handling Prices Accordion */}
        <li className="flex flex-col justify-center">
          <button
            onClick={handlePrice}
            className="flex subheading text-center border w-full py-4"
          >
            Price Range {priceOpen ? <RxCaretUp /> : <RxCaretDown />}
          </button>
          {priceOpen && (
            <div>
              <ul className="space-y-4">
                <li>$0 - $3</li>
                <li>$4 - $7</li>
              </ul>
            </div>
          )}
        </li>

        {/* Handling Availability Accordion */}

        <li className="flex flex-col justify-center">
          <button
            onClick={handleAvailability}
            className="flex subheading text-center border w-full py-4"
          >
            Availability {availabilityOpen ? <RxCaretUp /> : <RxCaretDown />}
          </button>
          {availabilityOpen && (
            <div>
              <ul className="space-y-4">
                <li>In stock</li>
                <li>Out of stock</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CategoryFilter;
