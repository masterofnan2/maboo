import React from "react";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import { useCartSelection } from "../Cart";
import arraySum from "../../../../../utilities/helpers/arraySum";
import { CartItem } from "../../../../../utilities/types/types";
import Price from "../../../../../utilities/minitiatures/Price/Price";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../../utilities/redux/store";
import Input from "../../../../../utilities/minitiatures/Input/Input";

const CartSummary = React.memo(() => {
    const { cartItems } = useCartSelection();
    const cart = useSelector((state: Rootstate) => state.customer.cart!);

    const subTotal = React.useMemo(() => {
        return arraySum<CartItem>(cart, (cartItem) => (cartItem.product.sale_price || cartItem.product.price) * cartItem.quantity);
    }, [cart]);

    return <div className="cart-summary col-3 bg-warning rounded d-flex flex-column justify-content-between p-5 py-4">
        <div className="">
            <Input type="text" name="promo_code" placeholder="Code promo" />
        </div>
        <div className="cart-details">
            <div>
                <h6>Sous-total</h6>
                <span><Price amount={subTotal} /></span>
            </div>
            <div>
                <h6>Total</h6>
                <span><Price amount={subTotal} /></span>
            </div>
        </div>
        <Button
            type="button"
            className="btn btn-primary"
            disabled={cartItems?.length === 0}>Commander {cartItems && <span className="has-number">({cartItems.length})</span>}</Button>
    </div>
});

export default CartSummary;