import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import Loading from "../../../../../utilities/minitiatures/Loading/Loading";
import List from "./List/List";
import { refreshProcessingOrders } from "../../../../../utilities/redux/customer/customerSlice";

const Processing = React.memo(() => {
    const { processing } = useSelector((state: Rootstate) => state.customer.orders);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!processing) {
            dispatch(refreshProcessingOrders());
        }
    }, [processing]);

    return <div className="processing-orders">
        <EmptyOrders show={Boolean(processing && processing.length === 0)} />
        <Loading show={!processing} />
        <List />
    </div>
});

export default Processing;