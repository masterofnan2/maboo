import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from '../../../../assets/icons/maboo.png';
import Fade from "../../../../utilities/minitiatures/Fade/Fade";

const Auth = React.memo(() => {
    return <Fade className="auth-container" show>
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
    </Fade>
});

export default Auth;