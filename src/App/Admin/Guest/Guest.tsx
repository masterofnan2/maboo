import React from "react";
import { Outlet } from "react-router-dom";
import { useRedirect } from "../../../utilities/hooks/admin/useRedirect";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../utilities/redux/store";

const Guest = React.memo(() => {
    const user = useSelector((state: Rootstate) => state.admin.auth);
    useRedirect(false);

    if (user === false) {
        return <Outlet />
    }
});

export default Guest;