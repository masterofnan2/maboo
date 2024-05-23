import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, Rootstate } from "../../../utilities/redux/store";
import { refreshCategoryProducts } from "../../../utilities/redux/customer/customerSlice";
import HoverableProduct, { HoverableProductPlaceholder } from "../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import generateArray from "../../../utilities/helpers/generateArray";
import Fade from "../../../utilities/minitiatures/Fade/Fade";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";

const randomArray = generateArray(10);

const Category = React.memo(() => {
    const id = useParams().id;

    const selectorId = React.useMemo(() => `category-${id}`, [id]);
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: Rootstate) => state.customer.categoryProducts[selectorId]);

    React.useEffect(() => {
        if (!products && id) {
            dispatch(refreshCategoryProducts(parseInt(id)));
        }
    }, [products, id]);

    return <div className="category-container container">

        <Fade from={{ opacity: 0 }} visible={Boolean(products && products.length > 0)} animateEnter className="d-flex flex-wrap gap-4 col-12">
            {products && products.length > 0 && products.map(product => {
                return <HoverableProduct product={product} key={product.id} />
            })}
        </Fade>

        <Fade from={{ opacity: 0 }} visible={!products} animateEnter={true} className="d-flex flex-wrap gap-4 col-12">
            {randomArray.map((random, key) => {
                random;
                return <HoverableProductPlaceholder
                    index={key}
                    key={key} />
            })}
        </Fade>

        <Fade from={{ opacity: 0 }} visible={products?.length === 0} animateEnter={true}>
            <ProductsEmpty />
        </Fade>
    </div>
})

export default Category;