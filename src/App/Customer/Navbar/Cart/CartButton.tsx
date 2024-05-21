import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import { refreshCart } from "../../../../utilities/redux/customer/customerSlice";
import { Link } from "react-router-dom";

const CartButton = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>()

    const { auth, cart } = useSelector((state: Rootstate) => state.customer);
    const cartCount = React.useMemo(() => cart?.length || 0, [cart]);

    React.useEffect(() => {
        if (!cart && auth) {
            dispatch(refreshCart());
        }
    }, [cart, auth]);

    return <Link
        to={'/cart'}
        className="btn cart-button">
        <span className="has-number">
            <i className="fa fa-cart-shopping"></i> <small>{cartCount}</small>
        </span> Panier
    </Link>
})

export default CartButton;