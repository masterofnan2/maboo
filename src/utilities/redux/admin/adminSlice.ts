import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BackOfficeOrder,
  BackOfficeOrderItem,
  Category,
  Product,
  User,
} from "../../constants/types";

import {
  getAdminProducts,
  getAdminRequests,
  getAllCategories,
  getDeliveredOrders,
  getProcessingOrders,
  getSellerRequests,
  getUncheckedOrders,
} from "../../api/admin/actions";

interface AdminState {
  categories: Category[] | null;
  products: Product[] | null;
  seller: {
    requests: User[] | null;
  };
  admin: {
    requests: User[] | null;
  };
  order: {
    processing: BackOfficeOrderItem[] | null;
    unchecked: BackOfficeOrder[] | null;
    delivered: BackOfficeOrderItem[] | null;
  };
}

const initialState: AdminState = {
  categories: null,
  products: null,
  seller: {
    requests: null,
  },
  admin: {
    requests: null,
  },
  order: {
    processing: null,
    unchecked: null,
    delivered: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setAdminProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        refreshCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        refreshProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      )
      .addCase(
        refreshSellerRequests.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.seller.requests = action.payload;
        }
      )
      .addCase(
        refreshAdminRequests.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.admin.requests = action.payload;
        }
      )
      .addCase(
        refreshProcessingOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrderItem[]>) => {
          state.order.processing = action.payload;
        }
      )
      .addCase(
        refreshUncheckedOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrder[]>) => {
          state.order.unchecked = action.payload;
        }
      )
      .addCase(
        refreshDeliveredOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrderItem[]>) => {
          state.order.delivered = action.payload;
        }
      );
  },
});

export const refreshDeliveredOrders = createAsyncThunk(
  "refreshDeliveredOrders",
  async () => {
    const response = await getDeliveredOrders();
    return response.data.orders;
  }
);

export const refreshUncheckedOrders = createAsyncThunk(
  "admin/refreshUncheckedOrders",
  async () => {
    const response = await getUncheckedOrders();
    return response.data?.orders;
  }
);

export const refreshProcessingOrders = createAsyncThunk(
  "admin/refreshProcessingOrders",
  async () => {
    const response = await getProcessingOrders();
    return response.data?.orders;
  }
);

export const refreshCategories = createAsyncThunk(
  "admin/refreshCategories",
  async () => {
    const response = await getAllCategories();
    return response.data.categories;
  }
);

export const refreshProducts = createAsyncThunk(
  "admin/refreshProducts",
  async () => {
    const response = await getAdminProducts();
    return response.data.products;
  }
);

export const refreshSellerRequests = createAsyncThunk(
  "admin/refreshSellerRequests",
  async () => {
    const response = await getSellerRequests();
    return response.data.sellers;
  }
);

export const refreshAdminRequests = createAsyncThunk(
  "admin/refreshAdminRequests",
  async () => {
    const response = await getAdminRequests();
    return response.data.admins;
  }
);

export const { setAdminProducts, setCategories} = adminSlice.actions;
export default adminSlice.reducer;
