import React from "react";
import { Product } from "../../../../../utilities/constants/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { refreshFeaturedProducts } from "../../../../../utilities/redux/customer/customerSlice";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import DoublePrice from "../../../../../utilities/minitiatures/DoublePrice/DoublePrice";
import { useNavigate } from "react-router-dom";

type Props = {
    products: Product[] | null
}

const ProductSuggestions = React.memo((props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = props;
    const navigate = useNavigate();

    const featuredProducts = useSelector((state: Rootstate) => state.customer.featuredProducts);

    const suggestions = React.useMemo(() => products || featuredProducts?.slice(0, 2), [products, featuredProducts]);

    React.useEffect(() => {
        !featuredProducts && dispatch(refreshFeaturedProducts());
    }, [featuredProducts]);

    return <div className="product-suggestions flex-wrap">
        <h5 className="product-suggestion-title col-12">Produits suggérés</h5>
        {suggestions?.map((product) => {
            return <div
                className="product-suggestion"
                onClick={() => navigate(`/product/${product.slug}`)}>
                <SquaredImage image={product.images[0]?.name} />
                <h6 className="product-title">{product.title}</h6>
                <DoublePrice
                    firstPrice={product.price}
                    secondPrice={product.sale_price || undefined} />
            </div>
        })}
    </div>
});

export default ProductSuggestions;