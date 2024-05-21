import React from "react";
import CartItemsList from "./CartItemsList/CartItemsList";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../utilities/redux/store";
import { CartItem } from "../../../../utilities/types/types";
import TablePlaceholder from "../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import CartEmpty from "./CartEmpty/CartEmpty";
import CartSummary from "./CartSummary/CartSummary";

const CartContext = React.createContext({
    selection: {
        cartItems: null as CartItem[] | null,
        setCartItems: function (cartItems: CartItem[] | null) { cartItems }
    }
});

export const useCartSelection = () => {
    return React.useContext(CartContext).selection;
}

const Cart = React.memo(() => {
    const { cart } = useSelector((state: Rootstate) => state.customer);

    const [state, setState] = React.useState({
        selection: {
            cartItems: null as CartItem[] | null,
        }
    });

    const selection = React.useMemo(() => ({
        cartItems: state.selection.cartItems,
        setCartItems: (cartItems: CartItem[] | null) => {
            setState(s => ({ ...s, selection: { ...s.selection, cartItems } }))
        }
    }), [state.selection.cartItems]);

    return <CartContext.Provider value={{ selection }}>
        <div className="cart-container">
            {cart && cart.length === 0 && <CartEmpty />}
            {cart && cart.length > 0 && <div className="d-flex col-12 justify-content-around">
                <CartItemsList />
                <CartSummary />
            </div>}
            {!cart && <TablePlaceholder />}
        </div>
    </CartContext.Provider>
});

export default Cart;