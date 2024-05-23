import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../constants/types";
import appImage from "../../helpers/appImage";
import DoublePrice from "../DoublePrice/DoublePrice";
import Button from "../Button/Button";
import { addToCart } from "../../api/customer/actions";
import useToasts from "../Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { refreshCart } from "../../redux/customer/customerSlice";

type Props = {
    product: Product,
    className?: string
};

const HoverableProduct = React.memo((props: Props) => {
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();
    const { product, className = '' } = React.useMemo(() => props, [props]);

    const [state, setState] = React.useState({
        loading: false,
    });

    const handleAddToCart = React.useCallback(() => {
        setState(s => ({ ...s, loading: true }));

        addToCart({
            product_id: product.id,
            quantity: 1,
        })
            .then(() => {
                toasts.push({
                    title: "Ajouté au panier",
                    content: "Votre panier a été mis à jour avec succès",
                    type: "success",
                })

                dispatch(refreshCart());
            })
            .catch(() => {
                toasts.push({
                    title: "Impossible d'ajouter au panier",
                    content: "Une erreur s'est produite lors de l'ajout au panier, veuillez réessayer plus tard",
                    type: "danger"
                })
            })
            .finally(() => {
                setState(s => ({ ...s, loading: false }));
            })
    }, [product.id, toasts.push]);

    return <div className={"hoverable-product " + className}>
        <div className="product-image-container">
            <div className="curtain">
                <div className="curtain-actions">
                    <Link
                        type="button"
                        className="btn btn-outline-dark btn-sm pt-2"
                        tabIndex={-1}
                        data-bs-toggle='tooltip'
                        title='Voir le produit'
                        to={'/product/' + product.slug}>
                        <i className="fa fa-eye"></i>
                    </Link>
                    <Button
                        type="button"
                        className="btn btn-outline-primary btn-sm pt-2"
                        data-bs-toggle='tooltip'
                        tabIndex={-1}
                        title='ajouter au panier'
                        onClick={handleAddToCart}
                        options={{ loading: state.loading }}>
                        <i className="fa fa-cart-plus"></i>
                    </Button>
                </div>
            </div>

            {product.images.length > 0 ? <img
                src={appImage(product.images[0].name)} className="product-image" /> :
                <div className="product-image" />}
        </div>
        <div className="mt-3 product-card-information">
            <h6>{product.title}</h6>
            <DoublePrice
                firstPrice={product.price}
                secondPrice={product.sale_price || undefined} />
        </div>
    </div>
});

export const HoverableProductPlaceholder = React.memo((props: { index: number }) => {
    const { index } = props;

    const productImageStyle = React.useMemo(() => ({ animationDelay: `${index * 500}ms` }), [index]);
    const productTitleStyle = React.useMemo(() => ({ animationDelay: `${index * 750}ms` }), [index]);

    return <div className="hoverable-product-placeholder placeholder-glow">
        <div className="product-image placeholder" style={productImageStyle}></div>
        <div className="product-title placeholder" style={productTitleStyle}></div>
    </div>
});

export default HoverableProduct;