import { useDispatch } from "react-redux";
import { addItem, removeItem} from "../utils/cartSlice";
import { CDN_URL } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ItemList = ({ items }) => {
const dispatch = useDispatch();

const handleRemoveItem = (itemId, itemName) => {
  dispatch(removeItem(itemId));

  toast.warn(`${itemName} removed from cart!`, {
    position: "bottom-center", // Use the string for the position
    autoClose: 2000, // Auto close after 2 seconds
    hideProgressBar: true, // Hide progress bar for a clean look
  });
};

const handleAddItem =(item) => {
  // Dispatch an action
  dispatch(addItem(item));
   // Show toast notification
   toast.success(`${item.card.info.name} added to the cart!`, {
    position: "bottom-center", // Use the string for the position
    autoClose: 2000, // Auto close after 2 seconds
    hideProgressBar: true, // Hide progress bar for a clean look
  });
};

  return (
    <div className="flex flex-col items-center">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-4 m-4 border-b-2 w-full max-w-2xl flex"
        >
          <div className="w-3/12 flex-shrink-0 relative">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-full h-auto rounded-md"
            />
            <button className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300" onClick={() => handleAddItem(item) } >
              Add +
            </button>
          </div>
          <div className="w-9/12 pl-4 flex flex-col justify-center">
            <div className="py-2">
              <span className="font-bold">{item.card.info.name}</span>
              <span className="ml-2 text-gray-700">
                - ₹
                {item.card.info.price
                  ? (item.card.info.price / 100).toFixed(2)
                  : (item.card.info.defaultPrice / 100).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 py-2">{item.card.info.description}</p>
            {/* Remove Button */}
            <button
              className="p-2 bg-red-500 text-white rounded-lg mt-2 hover:bg-red-600 transition-all"
              onClick={() =>
                handleRemoveItem(item.card.info.id, item.card.info.name) // Pass both id and name
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
