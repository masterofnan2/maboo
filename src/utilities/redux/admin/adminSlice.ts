import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BackOfficeOrder,
  Category,
  OrderItem,
  Product,
  User,
} from "../../constants/types";

import {
  getAdminProducts,
  getAdminRequests,
  getAllCategories,
  getAuth,
  getPendingOrders,
  getSellerRequests,
  getUncheckedOrders,
} from "../../api/admin/actions";

interface AdminState {
  auth: User | false | null;
  categories: Category[] | null;
  products: Product[] | null;
  seller: {
    requests: User[] | null;
  };
  admin: {
    requests: User[] | null;
  };
  order: {
    pending: OrderItem[];
    unchecked: BackOfficeOrder[] | null;
  };
}

const initialState: AdminState = {
  auth: null,
  categories: null,
  products: null,
  seller: {
    requests: null,
  },
  admin: {
    requests: null,
  },
  order: {
    pending: [],
    unchecked: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User | false>) => {
      state.auth = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        refreshAuth.fulfilled,
        (state, action: PayloadAction<User | false>) => {
          state.auth = action.payload;
        }
      )
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
        refreshPendingOrder.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.order.pending = action.payload;
        }
      )
      .addCase(
        refreshUncheckedOrders.fulfilled,
        (state, action: PayloadAction<BackOfficeOrder[]>) => {
          state.order.unchecked = action.payload;
        }
      );
  },
});

export const refreshUncheckedOrders = createAsyncThunk(
  "admin/refreshUncheckedOrders",
  async () => {
    const response = await getUncheckedOrders();
    return response.data?.orders;
  }
);

export const refreshPendingOrder = createAsyncThunk(
  "admin/refreshPendingOrder",
  async () => {
    const response = await getPendingOrders();
    return response.data?.orders;
  }
);

export const refreshAuth = createAsyncThunk("admin/refreshAuth", async () => {
  try {
    const auth = await getAuth();
    return auth.data?.user || false;
  } catch (e) {
    return false;
  }
});

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

export const { setAuth } = adminSlice.actions;
export default adminSlice.reducer;
