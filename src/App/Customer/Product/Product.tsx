import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, Rootstate } from "../../../utilities/redux/store";
import { refreshProduct } from "../../../utilities/redux/customer/customerSlice";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const Product = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>();

    const slug = useParams().slug;
    const product = useSelector((state: Rootstate) => state.customer.products[slug!]);

    React.useEffect(() => {
        if (!product) {
            dispatch(refreshProduct(slug!));
        }
    }, [product]);

    return <div className="product-container container">
        {product && <>
            <LeftSide />
            <RightSide />
        </>}
    </div>
})

export default Product;