import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart }  from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart() );
    };

    return(
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            {cartItems.length == 0 && ( <h2 className="text-xl mt-6 font-medium"> Your cart is empty 😔, Add items to the 🛒 </h2>
        )}
        <ItemList items={cartItems} />
        {cartItems.length > 0 && (
          <button
            className="p-2 m-2 bg-red-500 hover:bg-red-400 duration-[.3s] text-white rounded-md font-medium"
            onClick={handleClearCart}
          >
            Clear Cart 🧹
          </button>
        )}
        </div>
    );
};

export default Cart;