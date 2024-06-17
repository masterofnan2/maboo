import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import { refreshClosedOrders } from "../../../../../../../utilities/redux/admin/adminSlice";

const Closed = React.memo(() => {
    const { closed } = useSelector((state: Rootstate) => state.admin.order);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!closed) {
            dispatch(refreshClosedOrders());
        }
    }, [closed]);


    return <div className="closed-order-container">

    </div>
})

export default Closed;