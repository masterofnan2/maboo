import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import { refreshProcessingOrders } from "../../../../../../../utilities/redux/admin/adminSlice";
import Loading from "../../../../../../../utilities/minitiatures/Loading/Loading";
import OrdersEmpty from "../OrdersEmpty/OrdersEmpty";
import List from "./List/List";

const Processing = React.memo(() => {
    const { processing } = useSelector((state: Rootstate) => state.admin.order);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!processing) {
            dispatch(refreshProcessingOrders());
        }
    }, [processing]);

    return <div className="processing-orders-container">
        <Loading show={!processing} />
        <OrdersEmpty show={!Boolean(processing?.length)} />
        <List />
    </div>
});

export default Processing;