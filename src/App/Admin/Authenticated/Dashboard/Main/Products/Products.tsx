import React from "react";
import Fade from "../../../../../../utilities/minitiatures/Fade/Fade";
import ProductsList from "./ProductsList/ProductsList";
import AddProduct from "./AddProduct/AddProduct";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import EditProduct from "./EditProduct/EditProduct";
import { refreshCategories, refreshProducts } from "../../../../../../utilities/redux/admin/adminSlice";
import { AppDispatch, Rootstate } from "../../../../../../utilities/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../../../../utilities/constants/types";
import ProductsEmpty from "./ProductsEmpty/ProductsEmpty";
import TablePlaceholder from "../../../../../../utilities/minitiatures/TablePlaceholder/TablePlaceholder";

const DEFAULTEDIT = {
    current: null as Product | null,
    setCurrent: (products: Product | null) => { products }
}

const DEFAULTDELETE = {
    current: null as Product[] | null,
    setCurrent: (products: Product[] | null) => { products }
}

const ProductsContext = React.createContext({
    edit: DEFAULTEDIT,
    onDelete: DEFAULTDELETE,
});

export const useEditProduct = () => {
    return React.useContext(ProductsContext).edit;
}

export const useDeleteProduct = () => {
    return React.useContext(ProductsContext).onDelete;
}

const Products = React.memo(() => {

    const { categories, products } = useSelector((state: Rootstate) => state.admin);
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        edit: DEFAULTEDIT,
        onDelete: DEFAULTDELETE,
    });

    const edit = React.useMemo(() => {
        const setCurrent = (product: Product | null) => {
            setState(s => ({ ...s, edit: { ...s.edit, current: product } }));
        }

        return {
            current: state.edit.current,
            setCurrent
        }
    }, [state.edit.current]);

    const onDelete = React.useMemo(() => {
        const setCurrent = (products: Product[] | null) => {
            setState(s => ({ ...s, onDelete: { ...s.onDelete, current: products } }));
        }

        return {
            current: state.onDelete.current,
            setCurrent,
        }
    }, [state.onDelete.current]);

    React.useEffect(() => {
        if (!categories) {
            dispatch(refreshCategories());
        } else if (!products) {
            dispatch(refreshProducts());
        }
    }, [categories, products]);

    return <ProductsContext.Provider value={{ edit, onDelete }}>
        <div className="products-container">
            <Fade from={{ opacity: 0 }} visible={Boolean(products && products.length > 0)} animateEnter={true}>
                <ProductsList />
            </Fade>
            <Fade from={{ opacity: 0 }} visible={products?.length === 0} animateEnter={true}>
                <ProductsEmpty />
            </Fade>
            <Fade from={{ opacity: 0 }} visible={!products} animateEnter={true}>
                <TablePlaceholder />
            </Fade>
            <AddProduct />
            <DeleteProduct />
            <EditProduct />
        </div>
    </ProductsContext.Provider>
})

export default Products;