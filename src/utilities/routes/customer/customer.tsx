import { Route, Routes } from "react-router-dom";

import Customer from "../../../App/Customer/Customer";
import Homepage from "../../../App/Customer/Homepage/Homepage";
import Guest from "../../../App/Customer/Guest/Guest";
import Auth from "../../../App/Customer/Guest/Auth/Auth";
import Login from "../../../App/Customer/Guest/Auth/Login/Login";
import Signup from "../../../App/Customer/Guest/Auth/Signup/Signup";
import Authenticated from "../../../App/Customer/Authenticated/Authenticated";
import Confirmation from "../../../App/Customer/Guest/Auth/Confirmation/Confirmation";
import PasswordForgotten from "../../../App/Customer/Guest/Auth/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../../App/Customer/Guest/Auth/ResetPassword/ResetPassword";
import User from "../../../App/Customer/Authenticated/User/User";
import Profile from "../../../App/Customer/Authenticated/User/Profile/Profile";
import Category from "../../../App/Customer/Category/Category";
import Product from "../../../App/Customer/Product/Product";
import Cart from "../../../App/Customer/Authenticated/Cart/Cart";
import Orders from "../../../App/Customer/Authenticated/Orders/Orders";
import All from "../../../App/Customer/Authenticated/Orders/All/All";
import Order from "../../../App/Customer/Authenticated/Orders/Order/Order";

export default function () {
    return <Routes>
        <Route element={<Customer />} path='/'>
            <Route index element={<Homepage />} />
            <Route element={<Category />} path='category/:id' />
            <Route element={<Product />} path='product/:slug' />

            <Route element={<Guest />} path="/">
                <Route element={<Auth />} path="auth">
                    <Route element={<Login />} path="login" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PasswordForgotten />} path="password-forgotten" />
                    <Route element={<ResetPassword />} path="reset-password/:token" />
                </Route>
            </Route>
            <Route element={<Authenticated />} path='/'>
                <Route element={<Cart />} path="cart" />
                <Route element={<Orders />} path="orders">
                    <Route element={<All />} path="all" />
                    <Route element={<Order />} path="order/:id" />
                </Route>
                <Route element={<Auth />} path="auth">
                    <Route element={<Confirmation />} path="confirmation" />
                </Route>
                <Route element={<User />} path="user">
                    <Route element={<Profile />} path="profile" />
                </Route>
            </Route>
        </Route>
    </Routes>
}