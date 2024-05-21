import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import Fade from "../../../../../../../utilities/minitiatures/Fade/Fade";
import SellerRequestsList from "./SellerRequestsList/SellerRequestsList";
import TablePlaceholder from "../../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import { refreshSellerRequests } from "../../../../../../../utilities/redux/admin/adminSlice";
import RequestsEmpty from "./RequestsEmpty/RequestsEmpty";

const SellerRequests = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.admin.seller);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!requests) {
            dispatch(refreshSellerRequests());
        }
    }, [requests]);

    return <div className="seller-requests-container">
        <Fade from={{ opacity: 0 }} visible={Boolean(requests?.length)} animateEnter>
            <SellerRequestsList />
        </Fade>

        <Fade from={{ opacity: 0 }} visible={!requests} animateEnter>
            <TablePlaceholder />
        </Fade>

        <Fade
            from={{ opacity: 0 }}
            visible={requests?.length === 0}
            animateEnter>
            <RequestsEmpty />
        </Fade>
    </div >
});

export default SellerRequests;