import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, Rootstate } from "../../../utilities/redux/store";
import { refreshCategoryProducts } from "../../../utilities/redux/customer/customerSlice";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import generateArray from "../../../utilities/helpers/generateArray";
import Fade from "../../../utilities/minitiatures/Fade/Fade";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";

const Category = React.memo(() => {
    const id = useParams().id;

    const selectorId = React.useMemo(() => `category-${id}`, [id]);
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: Rootstate) => state.customer.categoryProducts[selectorId]);

    React.useEffect(() => {
        if (!products && id) {
            setTimeout(() => {
                dispatch(refreshCategoryProducts(parseInt(id)));
            }, 2000)
        }
    }, [products, id]);

    return <div className="category-container container">
        <Fade from={{ opacity: 0 }} visible={true} animateEnter={true} className="d-flex flex-wrap gap-4 col-12">
            {products?.length > 0 && products.map(product => {
                return <HoverableProduct product={product} key={product.id} />
            })}

            {!products && generateArray(10).map((random, key) => {
                random;
                return <HoverableProductPlaceholder
                    index={key}
                    key={key} />
            })}

            {products?.length === 0 && <ProductsEmpty />}
        </Fade>
    </div>
})

export default Category;