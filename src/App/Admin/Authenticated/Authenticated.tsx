import React from "react";
import { Outlet } from "react-router-dom";
import { useRedirect } from "../../../utilities/hooks/admin/useRedirect";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../utilities/redux/store";

const Authenticated = React.memo(() => {
    const user = useSelector((state: Rootstate) => state.admin.auth);
    useRedirect(true);

    if (user !== false && user !== null) {
        return <Outlet />
    }
});

export default Authenticated;