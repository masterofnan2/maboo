import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../utilities/redux/store";
import { refreshAuth } from "../../utilities/redux/customer/customerSlice";
import usePagePreloader from "../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";

const noNavbarPaths = ['/auth'];

const Customer = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const pagePreloader = usePagePreloader();
    const auth = useSelector((state: Rootstate) => state.customer.auth);

    React.useEffect(() => {
        if (auth === null) {
            dispatch(refreshAuth());
        } else {
            pagePreloader.disable();
        }
    }, [auth]);
    
    if (auth !== null) {
        return <div className="customer-container">
            {!noNavbarPaths.some((value) => location.pathname.startsWith(value)) && <Navbar />}
            <Outlet />
        </div>
    }
});

export default Customer;