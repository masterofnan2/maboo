import React from "react";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { refreshUncheckedOrders } from "../../../../../../../utilities/redux/admin/adminSlice";
import Loading from "../../../../../../../utilities/minitiatures/Loading/Loading";
import OrdersEmpty from "../OrdersEmpty/OrdersEmpty";
import OrderItemGroup from "../OrderItemGroup/OrderItemGroup";

const Unchecked = React.memo(() => {
    const orders = useSelector((state: Rootstate) => state.admin.order.unchecked);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!orders) {
            dispatch(refreshUncheckedOrders());
        }
    }, [orders]);

    return <div className="unchecked-container">
        <Loading show={!orders} />
        <OrdersEmpty show={Boolean(orders && !orders.length)} />
        {Boolean(orders?.length) && <>
            <h1 className="page-title"><i className="fa-solid fa-seal-question"></i> Commandes non vérifiées</h1>
            {orders?.map(order => <OrderItemGroup
                order={order}
                key={order.id} />)}
        </>}
    </div>
});

export default Unchecked;