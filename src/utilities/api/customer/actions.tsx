import toFormData from "../../helpers/toFormData";
import AppAxios from "../AppAxios";

const axios = new AppAxios("Customer");

export const signup = (payload: {
    email?: string,
    password?: string,
    name?: string,
    firstname?: string
}) => {
    return axios.post('/customer/auth/signup', payload);
}

export const login = (payload: {
    email?: string,
    password?: string,
}) => {
    return axios.post('/customer/auth/login', payload);
}

export const getAuth = () => {
    return axios.disableRedirectOnUnauthorized().get('/customer/auth/user');
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
    return axios.post('/customer/auth/reset-password', payload);
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
        console.log(axios);
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

export const getCategories = () => {
    return axios.get('/category/hierarchy');
}

export const getFeaturedProducts = () => {
    return axios.get('/product/featured');
}

export const getCategoryProducts = (id: number) => {
    return axios.get(`/category/${id}/products`);
}

export const getProduct = (slug: string) => {
    return axios.get(`/product/get/${slug}`);
}

export const getCart = () => {
    return axios.disableRedirectOnUnauthorized().get('/cart/get');
}

export const addToCart = (payload: {
    product_id: number,
    quantity: number,
    product_variant_id?: number,
    product_color_id?: number,
}) => {
    return axios.post('/cart/add', payload);
}

export const deleteCartItems = (ids: number[]) => {
    return axios.post('/cart/delete', { ids });
}

export const updateCartItem = (id: number, payload: {
    quantity?: number,
}) => {
    return axios.put(`/cart/update/${id}`, payload);
}

export const makeOrder = (cart_item_ids: number[]) => {
    return axios.post('/order/make', { cart_item_ids });
}

export const getOrder = (id: string) => {
    return axios.get(`/order/get/${id}`);
}

export const search = (keywords: string) => {
    return axios.get(`/search/small/${keywords}`);
}

export const initOrderTransaction = (payload: {
    order_id: string,
    method: 'ORANGEMONEY' | 'AIRTELMONEY' | 'MVOLA'
}) => {
    return axios.post('/transaction/order/make', payload);
}