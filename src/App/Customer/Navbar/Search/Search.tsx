import React from "react";
import Input from "../../../../utilities/minitiatures/Input/Input";
import ProductSuggestions from "./ProductSuggestions/ProductSuggestions";
import { Product, User } from "../../../../utilities/constants/types";
import { search } from "../../../../utilities/api/customer/actions";
import StringSuggestions from "./StringSuggestions/StringSuggestions";
import SearchFor from "./SearchFor/SearchFor";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";

const Search = React.memo(() => {
    const [state, setState] = React.useState({
        show: false,
        keywords: '',
        products: null as Product[] | null,
        sellers: null as User[] | null,
    });

    const inputRef = React.createRef<HTMLInputElement>();

    const toggleShow = React.useCallback(() => setState(s => ({ ...s, show: !s.show })), []);

    const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        search(value)
            .then(response => {
                const { products, sellers } = response.data;
                setState(s => ({ ...s, products, sellers, keywords: value }))
            })
    }, []);

    React.useEffect(() => {
        if (inputRef.current && state.show) {
            inputRef.current.focus();
        }
    }, [inputRef, state.show]);

    const noResults = React.useMemo(() => Boolean(
        (state.products && state.products.length === 0) && (state.sellers && state.sellers.length === 0)
    ), [state.products, state.sellers]);

    return <div className="search-container">
        <button
            type="button"
            className="btn"
            onClick={toggleShow}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <Fade show={state.show} className="search-body">
            <Input
                type="text"
                placeholder="rechercher ici..."
                onChange={handleSearch}
                onBlur={toggleShow}
                ref={inputRef} />

            <Fade show={noResults}>
                <SearchFor
                    keywords={state.keywords} />
            </Fade>

            <StringSuggestions
                products={state.products}
                sellers={state.sellers}
                keywords={state.keywords}
                show={!noResults} />

            <ProductSuggestions
                products={state.products} />
        </Fade>
    </div>
});

export default Search;