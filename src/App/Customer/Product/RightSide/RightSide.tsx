import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import SmallText from "../../../../utilities/minitiatures/SmallText/SmallText";
import CountButton from "../../../../utilities/minitiatures/CountButton/CountButton";
import Button from "../../../../utilities/minitiatures/Button/Button";
import DoublePrice from "../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import { addToCart } from "../../../../utilities/api/customer/actions";
import { refreshCart } from "../../../../utilities/redux/customer/customerSlice";
import useToasts from "../../../../utilities/minitiatures/Toast/hooks/useToasts";
import ProductMerchant from "../../../../utilities/minitiatures/ProductMerchant/ProductMerchant";

const RightSide = React.memo(() => {

    const slug = useParams().slug!;
    const product = useSelector((state: Rootstate) => state.customer.products[slug]!);
    const dispatch = useDispatch<AppDispatch>();
    const toasts = useToasts();

    const [state, setState] = React.useState({
        count: 1,
        loading: false,
    });

    const handleCountChange = React.useCallback((count: number) => {
        setState(s => ({ ...s, count }));
    }, []);

    const handleAddToCart = React.useCallback(() => {
        setState(s => ({ ...s, loading: true }));

        addToCart({
            product_id: product.id,
            quantity: state.count,
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
    }, [product.id, toasts.push, state.count]);


    return <div className="right-side-container">
        <div className="product-hierarchy">
            {`${product.category?.name} / ${product.title}`}
        </div>
        <div className="product-title">
            {product.title}
        </div>
        <div className="product-description">
            <SmallText maxLength={50} isExtendable>{product.description}</SmallText>
        </div>

        <DoublePrice
            firstPrice={product.price}
            secondPrice={product.sale_price || undefined} />

        <div className="d-flex gap-3">
            <CountButton
                count={state.count}
                onChange={handleCountChange}
                max={product.inStock}
                className="col-5" />

            <Button
                type="button"
                className="btn btn-outline-dark btn-sm col"
                onClick={handleAddToCart}
                options={{loading: state.loading}}><i className="fa fa-cart-plus"></i> Ajouter au panier</Button>
        </div>

        <div className="product-merchant">
            <h6>Marchand: </h6>
            <ProductMerchant merchant={product.merchant}/>
        </div>
    </div>
})

export default RightSide;