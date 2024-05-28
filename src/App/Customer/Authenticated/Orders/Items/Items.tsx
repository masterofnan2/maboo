import React from "react";
import appImage from "../../../../../utilities/helpers/appImage";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import ProductMerchant from "../../../../../utilities/minitiatures/ProductMerchant/ProductMerchant";
import Price from "../../../../../utilities/minitiatures/Price/Price";
import SmallText from "../../../../../utilities/minitiatures/SmallText/SmallText";
import { fakeCartItem } from "../../../../../utilities/constants/fakes";
import { Order } from "../../../../../utilities/constants/types";

type Props = {
    order: Order
}

const Items = React.memo(({ order }: Props) => {

    return <div className="items-container order-section">
        <div className="order-section-title">
            Articles
        </div>
        {order.order_items.map(order_item => {
            const item = order_item.cart_item || fakeCartItem;
            const { product } = item;

            return <div key={item.id} className="item-row">
                <SquaredImage image={appImage(product.images[0]?.name)} />
                <div>
                    <h6 className="product-title">{product.title}</h6>
                    <div className="product-description">
                        <SmallText isExtendable={false} maxLength={50}>{product.description}</SmallText>
                    </div>
                    <Price amount={item.subtotal} />
                    <div>
                        <span
                            className="item-subtitle">
                            quantité:
                        </span> <span
                        >
                            {item.quantity}
                        </span>
                    </div>
                    <div
                        className="d-flex gap-1 align-items-center">
                        <span
                            className="item-subtitle">
                            marchand: </span> <ProductMerchant
                            merchant={product.merchant}
                            showImage={false} />
                    </div>
                </div>
            </div>
        })}
    </div>
})

export default Items;