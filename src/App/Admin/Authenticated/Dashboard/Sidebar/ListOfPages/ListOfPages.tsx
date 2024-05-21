import React from "react";
import ListOfPage from "../ListOfpage/ListOfPage";

const listOfPages = [
    {
        title: 'Dashboard',
        path: '/',
        icon: 'fa fa-home'
    },
    {
        title: 'Catégories',
        path: '/categories',
        icon: 'fa-solid fa-list-timeline'
    },
    {
        title: 'Produits',
        path: '/products',
        icon: 'fa-light fa-list-dropdown'
    }
];

const ListOfPages = React.memo(() => {
    return <div className="list-of-pages">
        {listOfPages.map((listOfPage, key) => {
            return <ListOfPage {...listOfPage} key={key} />
        })}
    </div>
});

export default ListOfPages;