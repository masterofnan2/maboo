import React from "react";
import { Outlet } from "react-router-dom";

const Admin = React.memo(() => {
    return <div className="admin-container">
        <Outlet />
    </div>
});

export default Admin;