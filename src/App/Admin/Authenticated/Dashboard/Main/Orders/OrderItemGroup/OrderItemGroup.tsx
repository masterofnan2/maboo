import React from "react";
import { BackOfficeOrder } from "../../../../../../../utilities/constants/types";
import RoundedImage from "../../../../../../../utilities/minitiatures/RoundedImage/RoundedImage";
import appImage from "../../../../../../../utilities/helpers/appImage";
import Price from "../../../../../../../utilities/minitiatures/Price/Price";
import toFormatedDateString from "../../../../../../../utilities/helpers/toFormatedDateString";
import OrderItemComponent from "../../../../../../../utilities/minitiatures/OrderItemComponent/OrderItemComponent";
import { useFilterRow } from "../../../../../../../utilities/hooks/admin/useFilterRow";
import { Accordion } from "react-bootstrap";

type Props = {
    order: BackOfficeOrder,
}

const OrderItemGroup = React.memo((props: Props) => {
    const { order } = props;
    const user = React.useMemo(() => order.user, [order.user]);
    const filter = useFilterRow();

    const orderItemGroup = <div className="order-item-group">
        <div>
            <h5 className="section-title">
                Commande:
            </h5>
            <div className="order-info">
                <div className="order-total">
                    Total: <Price amount={order.total_price} className="order-price" />
                </div>
                <div className="order-date">
                    Date: <span>
                        {toFormatedDateString(order.created_at)}
                    </span>
                </div>
            </div>
        </div>

        <Accordion>
            <Accordion.Item eventKey={`accordion-user-${order.id}`}>
                <Accordion.Button className="section-title">
                    Utilisateur
                </Accordion.Button>
                <Accordion.Collapse className="buyer-info p-3" eventKey={`accordion-user-${order.id}`}>
                    <>
                        <RoundedImage image={appImage(user.image)} />
                        <div>{user.email}</div>
                        <div>{user.name} {user.firstname}</div>
                    </>
                </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey={`accordion-items-${order.id}`}>
                <Accordion.Button>
                    Articles
                </Accordion.Button>
                <Accordion.Collapse eventKey={`accordion-items-${order.id}`} className="p-3">
                    <>
                        {order.order_items.map(orderItem => <OrderItemComponent
                            key={orderItem.id}
                            orderItem={orderItem} />
                        )}
                    </>
                </Accordion.Collapse>
            </Accordion.Item>
        </Accordion>
    </div>

    return filter(
        [
            order.user.adress,
            order.user.email,
            order.user.firstname,
            order.user.name,
            order.total_price,
        ],
        orderItemGroup
    );
});

export default OrderItemGroup;