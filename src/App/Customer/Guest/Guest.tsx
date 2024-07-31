import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../../utilities/hooks/useAuth";
import { useRedirect } from "../../../utilities/hooks/useRedirect";

const Guest = React.memo(() => {
    const user = useAuth().auth;
    useRedirect(false);

    if (user === false) {
        return <Outlet />
    }
});

export default Guest;