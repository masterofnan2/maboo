import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../../utilities/hooks/useAuth";
import { useRedirect } from "../../../utilities/hooks/useRedirect";

const Authenticated = React.memo(() => {
    const user = useAuth().auth;
    useRedirect(true);

    if (user !== false && user !== null) {
        return <Outlet />
    }
});

export default Authenticated;