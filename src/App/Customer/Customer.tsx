import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const noNavbarPaths = ['/auth'];

const Customer = React.memo(() => {
    const location = useLocation();
    const hasNavbar = !noNavbarPaths.some((value) => location.pathname.startsWith(value));

    return <div className="customer-container">
        {hasNavbar && <Navbar />}
        <Outlet />
    </div>
});

export default Customer;