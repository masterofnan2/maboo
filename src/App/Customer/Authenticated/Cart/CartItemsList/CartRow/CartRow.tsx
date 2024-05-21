import React from "react";
import { CartItem } from "../../../../../../utilities/types/types";
import RoundedImage from "../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import Price from "../../../../../../utilities/minitiatures/Price/Price";
import { useCartSelection } from "../../Cart";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import appImage from "../../../../../../utilities/helpers/appImage";
import CountButton from "../../../../../../utilities/minitiatures/CountButton/CountButton";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usePagePreloader from "../../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";
import { updateCartItem } from "../../../../../../utilities/api/customer/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../utilities/redux/store";
import { refreshCart } from "../../../../../../utilities/redux/customer/customerSlice";
import useToasts from "../../../../../../utilities/minitiatures/Toast/hooks/useToasts";

type Props = {
    CartItem: CartItem,
    onDelete: Function,
}


const CartRow = React.memo((props: Props) => {
    let TIMEOUT = null as number | null;

    const { CartItem, onDelete } = props;
    const cartSelection = useCartSelection();
    const navigate = useNavigate();
    const pagePreloader = usePagePreloader();
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();

    const [newQuantity, setNewQuantity] = React.useState(null as number | null);

    const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        let newCartItems = [...cartSelection.cartItems!];

        if (checked && cartSelection.cartItems) {
            newCartItems.push(CartItem);
        } else {
            newCartItems = newCartItems.filter(item => item.id !== CartItem.id);
        }

        cartSelection.setCartItems(newCartItems);
    }, [cartSelection.cartItems, CartItem]);

    const handleQuantityChange = React.useCallback((quantity: number) => {
        setNewQuantity(quantity);

        const action = () => {
            if (quantity !== CartItem.quantity) {
                pagePreloader.enable();

                updateCartItem(CartItem.id, { quantity })
                    .then(() => {
                        dispatch(refreshCart());
                    })
                    .catch(() => {
                        toasts.push({
                            title: "Impossible de mettre l'article à jour !",
                            content: "Une erreur s'est produite lors de la tentative de mise à jour de l'article.",
                            type: "danger"
                        })
                    })
                    .finally(() => {
                        pagePreloader.disable();
                    })
            }
        }

        TIMEOUT && clearTimeout(TIMEOUT);
        TIMEOUT = setTimeout(() => {
            action();
            TIMEOUT = null;
        }, 1000);

    }, [pagePreloader, CartItem.id, CartItem.quantity, toasts.push]);

    return <tr>
        {cartSelection.cartItems &&
            <td>
                <Checkbox
                    checked={cartSelection.cartItems.some(item => item.id === CartItem.id)}
                    label=""
                    onChange={handleSelectChange} />
            </td>}
        <td onClick={() => navigate(`/product/${CartItem.product.slug}`)}>
            <RoundedImage image={appImage(CartItem.product.images[0]?.name || null) || undefined} />
        </td>
        <td>{CartItem.product.title}</td>
        <td>
            <CountButton count={newQuantity || CartItem.quantity} onChange={handleQuantityChange} />
        </td>
        <td>
            <Price amount={(CartItem.product.sale_price || CartItem.product.price) * CartItem.quantity} />
        </td>
        <td className="text-align-center">
            <Dropdown className="actions-dropdown">
                <Dropdown.Toggle variant="">
                    <i className="fa fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <i className="fa fa-check-circle text-primary"></i> Acheter
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => onDelete(CartItem.id)}>
                        Supprimer
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
});

export default CartRow;