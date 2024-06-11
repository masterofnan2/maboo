import { EditProductData } from "../../../App/Admin/Authenticated/Dashboard/Main/Products/EditProduct/EditProductBody/EditProductBody";
import { EditProductColorData } from "../../../App/Admin/Authenticated/Dashboard/Main/Products/ProductColor/ColorsList/ColorItem/Edit/Edit";
import { EditProductVariantData } from "../../../App/Admin/Authenticated/Dashboard/Main/Products/ProductVariant/VariantsList/VariantItem/Edit/Edit";
import toFormData from "../../helpers/toFormData";
import AppAxios from "../AppAxios";

const axios = new AppAxios("Admin");

export const signup = (payload: {
    email?: string,
    password?: string,
    name?: string,
    firstname?: string
}) => {
    return axios.post('/admin/auth/signup', payload);
}

export const login = (payload: {
    email?: string,
    password?: string,
}) => {
    return axios.post('/admin/auth/login', payload);
}

export const getAuth = () => {
    return axios.disableRedirectOnUnauthorized().get('/admin/auth/user');
}

export const makeEmailConfirmation = () => {
    return axios.get('/auth/email/make_confirmation');
}

export const matchConfirmationCode = (code: string) => {
    return axios.post('/auth/email/match_code', { code });
}

export const forgetPassword = (email: string) => {
    return axios.post('/auth/forgotten-password', { email });
}

export const resetPassword = (payload: {
    password: string,
    password_confirmation: string,
    token: string
}) => {
    return axios.post('/admin/auth/reset-password', payload);
}

export const updateUser = (payload: {
    name?: string,
    firstname?: string,
    email?: string,
    image?: File,
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.image && (payload.image instanceof File)) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post('/user/update', data);
}

export const changePassword = (payload: {
    current_password?: string,
    password?: string,
    password_confirmation?: string,
}) => {
    return axios.post('/user/change-password', payload);
}

export const createCategory = (payload: {
    name?: string,
    image?: File
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.image && payload.image instanceof File) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post('/category/create', data);
}

export const getAllCategories = () => {
    return axios.get('/category/all');
}

export const updateCategory = (payload: {
    id?: number,
    name?: string,
    parent_id?: number | null,
    image?: File | null,
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.image && payload.image instanceof File) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post('/category/update', data);
}

export const deleteCategories = (ids: number[]) => {
    return axios.post('/category/delete', { ids });
}

export const createProduct = (payload: {
    title?: string,
    description?: string,
    price?: number,
    sale_price?: number,
    inStock?: number,
    category_id?: number,
    images?: File[],
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.images && payload.images.length > 0) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post('/product/create', data);
}

export const getAdminProducts = () => {
    return axios.get('/admin/product/get');
}

export const updateProduct = (payload: EditProductData) => {
    let data = payload as typeof payload | FormData;

    if (payload.images && payload.images.length > 0) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post('/product/update', data);
}

export const deleteProductImage = (id: number) => {
    return axios.delete(`/product/image/delete/${id}`);
}

export const cancelProductUpdate = (id: number) => {
    return axios.post('/product/cancel-update', { id });
}

export const deleteProduct = (ids: number[]) => {
    return axios.post(`/product/delete`, { ids });
}

export const getSellerRequests = () => {
    return axios.get('/admin/seller/requests');
}

export const getAdminRequests = () => {
    return axios.get('/admin/admin/requests');
}

export const validateUser = (ids: number[]) => {
    return axios.post('/admin/user/validate', { ids });
}

export const createProductVariant = (payload: {
    image: File,
    name: string,
    product_id: number,
    price?: number,
    inStock: number,
}) => {
    return axios.payloadHasFile().post('/product/variant/create', toFormData(payload))
}

export const deleteProductVariants = (ids: number[]) => {
    return axios.post('/product/variant/delete', { ids });
}

export const updateProductVariant = (id: number, payload: EditProductVariantData) => {
    let data = { ...payload } as EditProductVariantData | FormData;

    if (payload.image) {
        data = toFormData(payload);
        axios.payloadHasFile();
    }

    return axios.post(`/product/variant/update/${id}`, data);
}

export const createProductColor = (payload: {
    name: string,
    product_id: number,
    code?: string,
}) => {
    return axios.payloadHasFile().post('/product/color/create', toFormData(payload))
}

export const deleteProductColors = (ids: number[]) => {
    return axios.post('/product/color/delete', { ids });
}

export const updateProductColor = (id: number, payload: EditProductColorData) => {
    return axios.post(`/product/color/update/${id}`, payload);
}

export const getProcessingOrders = () => {
    return axios.get('/admin/order/processing');
}

export const getUncheckedOrders = () => {
    return axios.get('/admin/order/unchecked');
}

export const markOrderAsConfirmed = (id: string) => {
    return axios.put(`/admin/order/update-transaction/${id}`, { status: "SUCCESS" });
}

export const markOrderAsCancelled = (id: string) => {
    return axios.put(`/admin/order/update-transaction/${id}`, { status: "CANCELLED" });
}

export const markOrderItemsAsDelivered = (orderItemIds: number[]) => {
    return axios.post(`/admin/order/updateStatus`, {
        status: 2,
        ids: orderItemIds,
    });
}