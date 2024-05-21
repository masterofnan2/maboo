import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../utilities/redux/store";
import Fade from "../../../../../../../utilities/minitiatures/Fade/Fade";
import AdminRequestsList from "./AdminRequestsList/AdminRequestsList";
import TablePlaceholder from "../../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";
import { refreshAdminRequests } from "../../../../../../../utilities/redux/admin/adminSlice";
import RequestsEmpty from "./RequestsEmpty/RequestsEmpty";

const AdminRequests = React.memo(() => {
    const { requests } = useSelector((state: Rootstate) => state.admin.admin);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!requests) {
            dispatch(refreshAdminRequests());
        }
    }, [requests]);

    return <div className="admin-requests-container">
        <Fade from={{ opacity: 0 }} visible={Boolean(requests?.length)} animateEnter>
            <AdminRequestsList />
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

export default AdminRequests;