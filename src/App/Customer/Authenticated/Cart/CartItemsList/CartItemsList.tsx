import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import CartRow from "./CartRow/CartRow";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import Checkbox from "../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { useCartSelection } from "../Cart";
import { deleteCartItems } from "../../../../../utilities/api/customer/actions";
import valuesOf from "../../../../../utilities/helpers/valuesOf";
import { refreshCart } from "../../../../../utilities/redux/customer/customerSlice";
import useToasts from "../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import usePagePreloader from "../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";

const CartItemsList = React.memo(() => {
    const cart = useSelector((state: Rootstate) => state.customer.cart);
    const cartSelection = useCartSelection();
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();
    const pagePreloader = usePagePreloader();

    const handleSelectAll = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        if (checked) {
            cartSelection.setCartItems(cart);
        } else {
            cartSelection.setCartItems([]);
        }
    }, [cartSelection.setCartItems]);

    const toggleSelection = React.useCallback(() => {
        if (cartSelection.cartItems) {
            cartSelection.setCartItems(null);
        } else {
            cartSelection.setCartItems([]);
        }
    }, [cartSelection])

    const handleDelete = React.useCallback((cartItemId?: number) => {
        if (cartItemId || cartSelection.cartItems) {
            const ids = cartItemId ? [cartItemId] : valuesOf<number>('id', cartSelection.cartItems!);
            pagePreloader.enable();

            deleteCartItems(ids)
                .then(() => {
                    dispatch(refreshCart());

                    toasts.push({
                        title: 'Panier mis à jour!',
                        content: "Les articles ont été supprimés du panier.",
                        type: "success",
                    });

                    cartSelection.setCartItems(null);
                })
                .catch(() => {
                    toasts.push({
                        title: "Impossible de supprimer les articles",
                        content: "Une erreur s'est produite lors de la suppression des produits du panier.",
                        type: "danger",
                    })
                })
                .finally(() => {
                    pagePreloader.disable();
                })
        }
    }, [cartSelection, toasts.push, pagePreloader]);

    return <div className="cart-items-list-container col-8">
        <table className="table align-middle">
            <thead>
                <tr>
                    {cartSelection.cartItems &&
                        <th>
                            <Checkbox
                                label="Tout"
                                checked={cart?.length === cartSelection.cartItems.length}
                                onChange={handleSelectAll} />
                        </th>}
                    <th className="col-1"></th>
                    <th className="col-3">Titre</th>
                    <th className="col-2">Quantité</th>
                    <th className="col-2">Sous-total</th>
                    <th className="col-2 text-align-center">
                        {cartSelection.cartItems ?
                            <Button
                                type="button"
                                className="btn text-danger"
                                onClick={() => handleDelete()}
                                disabled={cartSelection.cartItems.length === 0}>
                                Supprimer <span className="has-number">({cartSelection.cartItems.length})</span>
                            </Button> :
                            <Button
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                onClick={toggleSelection}>Séléctionner</Button>}
                    </th>
                </tr>
            </thead>
            <tbody>
                {cart?.length && cart.map((cartItem, key) => {
                    return <CartRow
                        CartItem={cartItem}
                        key={key}
                        onDelete={handleDelete} />
                })}
            </tbody>
        </table>
    </div>
});

export default CartItemsList;