import { Route, Routes } from "react-router-dom";

import Customer from "../../../App/Customer/Customer";
import Homepage from "../../../App/Customer/Homepage/Homepage";
import Guest from "../../../App/Customer/Guest/Guest";
import Auth from "../../../App/Customer/Guest/Auth/Auth";
import Authenticated from "../../../App/Customer/Authenticated/Authenticated";
import User from "../../../App/Customer/Authenticated/User/User";
import Category from "../../../App/Customer/Category/Category";
import Product from "../../../App/Customer/Product/Product";
import Cart from "../../../App/Customer/Authenticated/Cart/Cart";
import Orders from "../../../App/Customer/Authenticated/Orders/Orders";
import List from "../../../App/Customer/Authenticated/Orders/List/List";
import Order from "../../../App/Customer/Authenticated/Orders/Order/Order";
import Search from "../../../App/Customer/Search/Search";
import Profile from "../../minitiatures/Profile/Profile";
import Login from "../../minitiatures/Login/Login";
import Signup from "../../minitiatures/Signup/Signup";
import PasswordForgotten from "../../minitiatures/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../minitiatures/ResetPassword/ResetPassword";
import Confirmation from "../../minitiatures/Confirmation/Confirmation";

export default function () {
    return <Routes>
        <Route element={<Customer />} path='/'>
            <Route index element={<Homepage />} />
            <Route element={<Category />} path='category/:id' />
            <Route element={<Product />} path='product/:slug' />
            <Route element={<Search />} path='search/:words' />

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
                    <Route element={<List />} path="list" />
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