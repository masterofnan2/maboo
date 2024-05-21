import React from "react";
import ForTheBaby from "./ForTheBaby/ForTheBaby";
import ForTheMother from "./ForTheMother/ForTheMother";
import ForBoth from "./ForBoth/ForBoth";

const Categories = React.memo(() => {
    return <section className="categories-container container">
        <div className="section-information">
            <h5 className="section-title display-6">Nous l'avons</h5>
            <p className="section-description">
                Vous pouvez gagner la confiance de quelqu’un par ce que vous dites et ce que vos actions montrent.
                Il existe trois types de confiance : la confiance dans la famille, la confiance dans un être cher ou un petit ami et la confiance dans les amis.
            </p>
        </div>
        <div className="categories-container d-flex justify-content-between">
            <ForTheBaby />
            <ForBoth />
            <ForTheMother />
        </div>
    </section>
});

export default Categories;