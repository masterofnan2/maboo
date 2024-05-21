import { configureStore } from "@reduxjs/toolkit";
import customerReducer from './customer/customerSlice';
import adminReducer from './admin/adminSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
        admin: adminReducer,
    }
})

export default store;
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;