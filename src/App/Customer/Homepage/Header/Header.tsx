import React from "react"

const Header = React.memo(() => {
    return <header className="header-container">
        <div className="header-gradient">
            <div className="header-content mx-5">
                <h3 className="display-5 text-secondary">Petit Trésors, Grands Bonheurs</h3>
                <p className="text-light">
                    Câlins, sourires et couches : notre spécialité.
                    Des solutions pratiques pour les parents, des rires pour les bébés
                </p>
                <button className="btn btn-outline-light header-action">Nos Abonnements <i className="fa fa-chevron-down"></i></button>
            </div>
        </div>
    </header>
});

export default Header;