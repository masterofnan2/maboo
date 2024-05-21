import React from "react";
import { useLocation } from "react-router-dom";

const ADMIN = 'ADMIN';
const CUSTOMER = 'CUSTOMER'

export default function () {
    const location = useLocation();

    const isAdmin = React.useMemo(() => location.pathname.startsWith('/admin'), [location.pathname]);

    if (isAdmin) {
        return ADMIN;
    }

    return CUSTOMER;
}