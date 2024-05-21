import React from "react";
import CustomerRoutes from './customer/customer';
import AdminRoutes from './admin/admin';
import { useLocation } from "react-router-dom";

export const AppRoutes = React.memo(() => {
    const location = useLocation();

    const isAdmin = React.useMemo(() => location.pathname.startsWith('/admin'), [location.pathname]);
    const isCustomer = React.useMemo(() => !isAdmin, [isAdmin]);

    return <>
        {isCustomer && <CustomerRoutes />}
        {isAdmin && <AdminRoutes />}
    </>
});