import React from "react";
import Input from "../../../../../utilities/minitiatures/Input/Input";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import Price from "../../../../../utilities/minitiatures/Price/Price";
import { useOrder } from "../Order";

const OrderSummary = React.memo(() => {
    const order = useOrder()!;

    const paymentTax = React.useMemo(() => 2500, []);

    const total = React.useMemo(() => (order.total_price + paymentTax), [order.total_price, paymentTax]);

    return <div className="order-summary-container">
        <div>
            <Input type="text" placeholder="Coupon" />
        </div>
        <div className="order-details">
            <div className="order-detail-item">
                <h6 className="">Sous-total</h6>
                <Price amount={order.total_price} />
            </div>
            <div className="order-detail-item">
                <h6 className="">Taxes de paiement</h6>
                <Price amount={2500} />
            </div>
        </div>
        <div className="order-total">
            <h6>Total</h6>
            <Price amount={total} />
        </div>
        <Button
            type="button"
            className="btn btn-primary">
            Payer
        </Button>
    </div>
})

export default OrderSummary;