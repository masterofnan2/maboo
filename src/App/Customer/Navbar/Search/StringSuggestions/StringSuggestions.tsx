import React from "react";
import { Category, Product, User } from "../../../../../utilities/constants/types";

type Props = {
    products: Product[] | null,
    sellers: User[] | null,
    categories: Category[] | null,
    keywords: string,
}

const StringSuggestions = React.memo((props: Props) => {
    const { categories = [], products = [], sellers = [], keywords} = props;

    const text = React.useMemo(() => {}, []);

    return <ul className="string-suggestions">
        {products!.map(product => {
            return <li>{product.title}</li>
        })}
        {sellers!.map(seller => {
            return <li>{seller.name} {seller.firstname}</li>
        })}
        {categories!.map(category => {
            return <li>{category.name}</li>
        })}
    </ul>
})

export default StringSuggestions;