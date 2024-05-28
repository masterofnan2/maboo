import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { refreshAllOrders } from "../../../../../utilities/redux/customer/customerSlice";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import Loading from "../../../../../utilities/minitiatures/Loading/Loading";
import OrderItemsGroup from "../OrderItemsGroup/OrderItemsGroup";
import EmptyOrders from "../EmptyOrders/EmptyOrders";

const All = React.memo(() => {
    const allOrders = useSelector((state: Rootstate) => state.customer.orders.all);
    const dispatch = useDispatch<AppDispatch>()

    React.useEffect(() => {
        if (!allOrders) {
            dispatch(refreshAllOrders());
        }
    }, [allOrders]);

    return <Fade className="all-orders-container" show>
        <Loading show={!allOrders} />
        {(allOrders && allOrders.length === 0) &&
            <EmptyOrders />}

        {allOrders?.map(order => {
            return <OrderItemsGroup order={order} key={order.id} />
        })}
    </Fade>
});

export default All;