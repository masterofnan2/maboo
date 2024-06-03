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
import ProductVariant from "./ProductVariant/ProductVariant";
import ProductColor from "./ProductColor/ProductColor";

const DEFAULT_EDIT = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const DEFAULT_DELETE = {
    current: null as Product[] | null,
    setCurrent: (products: Product[] | null) => { products }
}

const DEFAULT_PRODUCT_VARIANT = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const DEFAULT_PRODUCT_COLOR = {
    current: null as Product | null,
    setCurrent: (product: Product | null) => { product }
}

const ProductsContext = React.createContext({
    edit: DEFAULT_EDIT,
    onDelete: DEFAULT_DELETE,
    variant: DEFAULT_PRODUCT_VARIANT,
    color: DEFAULT_PRODUCT_COLOR,
});

export const useEditProduct = () => {
    return React.useContext(ProductsContext).edit;
}

export const useDeleteProduct = () => {
    return React.useContext(ProductsContext).onDelete;
}

export const useVariant = () => {
    return React.useContext(ProductsContext).variant;
}

export const useColor = () => {
    return React.useContext(ProductsContext).color;
}

const Products = React.memo(() => {

    const { categories, products } = useSelector((state: Rootstate) => state.admin);
    const dispatch = useDispatch<AppDispatch>();

    const [state, setState] = React.useState({
        edit: DEFAULT_EDIT,
        onDelete: DEFAULT_DELETE,
        variant: DEFAULT_PRODUCT_VARIANT,
        color: DEFAULT_PRODUCT_COLOR,
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

    const variant = React.useMemo(() => {
        const setCurrent = (product: Product | null) => {
            setState(s => ({ ...s, variant: { ...s.variant, current: product } }));
        }

        return {
            current: state.variant.current,
            setCurrent,
        }
    }, [state.variant.current]);

    const color = React.useMemo(() => ({
        current: state.color.current,
        setCurrent: (product: Product | null) => {
            setState(s => ({ ...s, color: { ...s.color, current: product } }));
        }
    }), [state.color.current]);

    React.useEffect(() => {
        if (!categories) {
            dispatch(refreshCategories());
        } else if (!products) {
            dispatch(refreshProducts());
        }
    }, [categories, products]);

    return <ProductsContext.Provider value={{ edit, onDelete, variant, color }}>
        <div className="products-container">
            <Fade show={Boolean(products && products.length > 0)}>
                <ProductsList />
            </Fade>
            <Fade show={products?.length === 0}>
                <ProductsEmpty />
            </Fade>
            <Fade show={!products}>
                <TablePlaceholder />
            </Fade>
            <AddProduct />
            <DeleteProduct />
            <EditProduct />
            <ProductVariant />
            <ProductColor />
        </div>
    </ProductsContext.Provider>
});

export default Products;