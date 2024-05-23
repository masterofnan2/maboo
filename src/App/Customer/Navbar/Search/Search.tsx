import React from "react";
import Input from "../../../../utilities/minitiatures/Input/Input";
import ProductSuggestions from "./ProductSuggestions/ProductSuggestions";
import { Product } from "../../../../utilities/constants/types";
import { search } from "../../../../utilities/api/customer/actions";
import StringSuggestions from "./StringSuggestions/StringSuggestions";

const Search = React.memo(() => {
    const [state, setState] = React.useState({
        show: false,
        keywords: '',
        products: null as Product[] | null,
        sellers: null,
        categories: null,
    });

    const toggleShow = React.useCallback(() => setState(s => ({ ...s, show: !s.show })), []);

    const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        search(value)
            .then(response => {
                const { products, sellers, categories } = response.data;
                setState(s => ({ ...s, products, sellers, categories, keywords: value }))
            })
    }, []);

    return <div className="search-container">
        <button
            type="button"
            className="btn"
            onClick={toggleShow}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <div className="search-body">
            <Input
                type="text"
                placeholder="rechercher ici..."
                onChange={handleSearch} />

            <StringSuggestions
                products={state.products}
                categories={state.categories}
                sellers={state.sellers}
                keywords={state.keywords} />

            <ProductSuggestions
                products={state.products} />
        </div>
    </div>
});

export default Search;