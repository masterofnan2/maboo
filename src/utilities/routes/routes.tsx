import React from "react";
import CustomerRoutes from './customer/customer';
import AdminRoutes from './admin/admin';
import userType from "../helpers/userType";
import { useLocation } from "react-router-dom";

export const AppRoutes = React.memo(() => {
    const { pathname } = useLocation();

    const isAdmin = React.useMemo(() => userType() === "admin", [pathname]);
    const isCustomer = React.useMemo(() => userType() === "customer", [pathname]);

    return <>
        {isCustomer && <CustomerRoutes />}
        {isAdmin && <AdminRoutes />}
    </>
});