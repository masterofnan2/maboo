import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rootstate } from "../../../../utilities/redux/store";
import SmallText from "../../../../utilities/minitiatures/SmallText/SmallText";
import CountButton from "../../../../utilities/minitiatures/CountButton/CountButton";
import Button from "../../../../utilities/minitiatures/Button/Button";
import DoublePrice from "../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import ProductMerchant from "../../../../utilities/minitiatures/ProductMerchant/ProductMerchant";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import { useAddToCart } from "../../../../utilities/api/customer/hooks";

const RightSide = React.memo(() => {

    const addToCart = useAddToCart();
    const slug = useParams().slug!;
    const product = useSelector((state: Rootstate) => state.customer.products[slug]!);

    const [state, setState] = React.useState({
        count: 1,
        loading: false,
    });

    const handleCountChange = React.useCallback((count: number) => {
        setState(s => ({ ...s, count }));
    }, []);

    const handleAddToCart = React.useCallback(() => {
        addToCart({
            payload: {
                product_id: product.id,
                quantity: state.count
            },
            onInit: () => setState(s => ({ ...s, loading: true })),
            onFinally: () => setState(s => ({ ...s, loading: false }))
        })
    }, [product.id, state.count]);

    return <Fade className="right-side-container" show>
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
                options={{ loading: state.loading }}><i className="fa fa-cart-plus"></i> Ajouter au panier</Button>
        </div>

        <div className="product-merchant">
            <h6>Marchand: </h6>
            <ProductMerchant merchant={product.merchant} />
        </div>
    </Fade>
})

export default RightSide;