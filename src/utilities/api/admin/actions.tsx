import QueryUrl from "../../helpers/QueryUrl";
import toFormData from "../../helpers/toFormData";
import api from "../api";

export const createCategory = (payload: {
    name?: string,
    image?: File
}) => {
    let data = payload as typeof payload | FormData;

    if (payload.image && payload.image instanceof File) {
        data = toFormData(payload);
    }

    return api.post('/category/create', data);
}

export const getAllCategories = () => {
    return api.get('/category/all');
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
    }

    return api.post('/category/update', data);
}

export const deleteCategories = (ids: number[]) => {
    return api.post('/category/delete', { ids });
}

export const getAdminProducts = (options?: {
    limit?: number,
    offset?: number,
}) => {
    const Url = new QueryUrl('/admin/product/get');
    if (options?.offset) Url.addParam('offset', options.offset);
    if (options?.limit) Url.addParam('limit', options.limit);

    return api.get(Url.getString());
}

export const getSellerRequests = () => {
    return api.get('/admin/seller/requests');
}

export const getAdminRequests = () => {
    return api.get('/admin/admin/requests');
}

export const validateUser = (ids: number[]) => {
    return api.post('/admin/user/validate', { ids });
}

export const getProcessingOrders = () => {
    return api.get('/admin/order/processing');
}

export const getUncheckedOrders = () => {
    return api.get('/admin/order/unchecked');
}

export const markOrderAsConfirmed = (id: string) => {
    return api.put(`/admin/order/update-transaction/${id}`, { status: "SUCCESS" });
}

export const markOrderAsCancelled = (id: string) => {
    return api.put(`/admin/order/update-transaction/${id}`, { status: "CANCELLED" });
}

export const getDeliveredOrders = () => {
    return api.get('/admin/order/delivered');
}

export const usersCount = () => {
    return api.get('/admin/user/count');
}