import React from "react";
import { Outlet } from "react-router-dom";
import { useRedirect } from "../../../utilities/hooks/useRedirect";
import useAuth from "../../../utilities/hooks/useAuth";

const Authenticated = React.memo(() => {
    const user = useAuth().auth;
    useRedirect(true);

    if (user !== false && user !== null) {
        return <Outlet />
    }
});

export default Authenticated;