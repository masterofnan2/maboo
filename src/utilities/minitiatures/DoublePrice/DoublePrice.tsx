import React from "react";
import Price from "../Price/Price";

type Props = {
    firstPrice: number,
    secondPrice?: number,
}

const DoublePrice = React.memo((props: Props) => {
    const { firstPrice, secondPrice } = props;

    return <>
        {secondPrice ? <div className="d-flex gap-2">
            <Price amount={firstPrice} className="product-price" dashed />
            <Price amount={secondPrice} className="product-price" />
        </div> :
            <Price amount={firstPrice} className="product-price" />}
    </>
})

export default DoublePrice;