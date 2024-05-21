import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from '../../../../assets/icons/maboo.png';

const Auth = React.memo(() => {
    return <div className="auth-container">
        <div className="left-side"></div>
        <div className="right-side">
            <div className="static">
                <Link to={'/'}>
                    <img
                        className="logo"
                        src={logo} />
                </Link>
            </div>
            <div className="dynamic">
                <Outlet />
            </div>
        </div>
    </div>
});

export default Auth;