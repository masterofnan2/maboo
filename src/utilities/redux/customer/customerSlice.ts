import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  cancelledOrders,
  deliveredOrders,
  getAuth,
  getCart,
  getCategories,
  getCategoryProducts,
  getFeaturedProducts,
  getProduct,
  processingOrders,
} from "../../api/customer/actions";
import {
  CartItem,
  CategoriesHierarchy,
  Order,
  OrderItem,
  Product,
  User,
} from "../../constants/types";

interface CustomerState {
  auth: User | false | null;
  categories: CategoriesHierarchy | null;
  featuredProducts: Product[] | null;
  categoryProducts: {
    [key: string]: Product[] | undefined;
  };
  products: {
    [key: string]: Product | undefined;
  };
  cart: CartItem[] | null;
  orders: {
    cancelled: Order[] | null;
    processing: OrderItem[] | null;
    delivered: OrderItem[] | null;
    order: {
      [key: string]: Order;
    };
  };
}

const initialState: CustomerState = {
  auth: null,
  categories: null,
  featuredProducts: null,
  categoryProducts: {},
  products: {},
  cart: null,
  orders: {
    cancelled: null,
    processing: null,
    delivered: null,
    order: {},
  },
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User | false>) => {
      state.auth = action.payload;
    },
    setCategoryProducts: (
      state,
      action: PayloadAction<{ products: Product[]; selectorId: string }>
    ) => {
      state.categoryProducts[action.payload.selectorId] =
        action.payload.products;
    },
    setCancelledOrders: (state, action: PayloadAction<Order[] | null>) => {
      state.orders.cancelled = action.payload;
    },
    setProcessingOrders: (state, action: PayloadAction<OrderItem[] | null>) => {
      state.orders.processing = action.payload;
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
        (state, action: PayloadAction<CategoriesHierarchy>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        refreshFeaturedProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.featuredProducts = action.payload;
        }
      )
      .addCase(
        refreshCategoryProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ products: Product[]; category_id: number }>
        ) => {
          state.categoryProducts[`category-${action.payload.category_id}`] =
            action.payload.products;
        }
      )
      .addCase(
        refreshProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const product = action.payload;

          if (product) {
            state.products[product.slug] = product;
          }
        }
      )
      .addCase(
        refreshCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cart = action.payload;
        }
      )
      .addCase(
        refreshCancelledOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders.cancelled = action.payload;
        }
      )
      .addCase(
        refreshProcessingOrders.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.orders.processing = action.payload;
        }
      )
      .addCase(
        refreshDeliveredOrders.fulfilled,
        (state, action: PayloadAction<OrderItem[]>) => {
          state.orders.delivered = action.payload;
        }
      );
  },
});

export const refreshDeliveredOrders = createAsyncThunk(
  "customer/refreshDeliveredOrders",
  async () => {
    const response = await deliveredOrders();
    return response.data.order_items;
  }
);

export const refreshProcessingOrders = createAsyncThunk(
  "customer/refreshProcessingOrders",
  async () => {
    const response = await processingOrders();
    return response.data.order_items;
  }
);

export const refreshCancelledOrders = createAsyncThunk(
  "customer/refreshCancelledOrders",
  async () => {
    const response = await cancelledOrders();
    return response.data.orders;
  }
);

export const refreshAuth = createAsyncThunk(
  "customer/refreshAuth",
  async () => {
    try {
      const auth = await getAuth();
      return auth.data?.user || false;
    } catch (e) {
      return false;
    }
  }
);

export const refreshCategories = createAsyncThunk(
  "customer/refreshCategories",
  async () => {
    const response = await getCategories();
    return response.data?.hierarchy;
  }
);

export const refreshCategoryProducts = createAsyncThunk(
  "customer/refreshCategoryProducts",
  async (category_id: number) => {
    const response = await getCategoryProducts(category_id);
    return {
      products: response.data?.products,
      category_id,
    };
  }
);

export const refreshFeaturedProducts = createAsyncThunk(
  "customer/refreshFeaturedProducts",
  async () => {
    const response = await getFeaturedProducts();
    return response.data?.products;
  }
);

export const refreshProduct = createAsyncThunk(
  "customer/refreshProduct",
  async (slug: string) => {
    const response = await getProduct(slug);
    return response.data?.product;
  }
);

export const refreshCart = createAsyncThunk(
  "customer/refreshCart",
  async () => {
    const response = await getCart();
    return response.data?.cart;
  }
);

export const { setAuth, setCategoryProducts } = customerSlice.actions;
export default customerSlice.reducer;
