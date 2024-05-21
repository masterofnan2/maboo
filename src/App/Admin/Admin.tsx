import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../utilities/redux/store";
import { refreshAuth } from "../../utilities/redux/admin/adminSlice";
import usePagePreloader from "../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";

const Admin = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const pagePreloader = usePagePreloader();
    const auth = useSelector((state: Rootstate) => state.admin.auth);

    React.useEffect(() => {
        if (auth === null) {
            dispatch(refreshAuth());
        } else {
            pagePreloader.disable();
        }
    }, [auth]);

    if (auth !== null) {
        return <div className="admin-container">
            <Outlet />
        </div>
    }
});

export default Admin;