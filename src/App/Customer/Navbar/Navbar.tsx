import React from "react";
import UserDropdown from "./UserDropdown/UserDropdown";
import NavItems from "./NavItems/NavItems";
import Search from "./Search/Search";
import { Link } from "react-router-dom";
import CartButton from "./Cart/CartButton";

const Navbar = React.memo(() => {
    return <nav
        className="navbar navbar-expand-sm navbar-container navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand" to="/">Maboo</Link>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <NavItems />
                <Search />
                <CartButton />
                <UserDropdown />
            </div>
        </div>
    </nav>
})

export default Navbar;