import { Route, Routes } from "react-router-dom";

import Admin from "../../../App/Admin/Admin";
import Guest from "../../../App/Admin/Guest/Guest";
import Auth from "../../../App/Admin/Guest/Auth/Auth";
import Login from "../../../App/Admin/Guest/Auth/Login/Login";
import Signup from "../../../App/Admin/Guest/Auth/Signup/Signup";
import PasswordForgotten from "../../../App/Admin/Guest/Auth/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../../App/Admin/Guest/Auth/ResetPassword/ResetPassword";
import Authenticated from "../../../App/Admin/Authenticated/Authenticated";
import Confirmation from "../../../App/Admin/Guest/Auth/Confirmation/Confirmation";
import User from "../../../App/Admin/Authenticated/Dashboard/Main/User/User";
import Profile from "../../../App/Admin/Authenticated/Dashboard/Main/User/Profile/Profile";
import Dashboard from "../../../App/Admin/Authenticated/Dashboard/Dashboard";
import Categories from "../../../App/Admin/Authenticated/Dashboard/Main/Categories/Categories";
import Products from "../../../App/Admin/Authenticated/Dashboard/Main/Products/Products";
import Seller from "../../../App/Admin/Authenticated/Dashboard/Main/Seller/Seller";
import SellerRequests from "../../../App/Admin/Authenticated/Dashboard/Main/Seller/SellerRequests/SellerRequests";
import Validation from "../../../App/Admin/Guest/Auth/Validation/Validation";
import Admins from '../../../App/Admin/Authenticated/Dashboard/Main/Admin/Admin';
import AdminRequests from "../../../App/Admin/Authenticated/Dashboard/Main/Admin/AdminRequests/AdminRequests";
import Orders from "../../../App/Admin/Authenticated/Dashboard/Main/Orders/Orders";
import Unchecked from "../../../App/Admin/Authenticated/Dashboard/Main/Orders/Unchecked/Unchecked";
import Processing from "../../../App/Admin/Authenticated/Dashboard/Main/Orders/Processing/Processing";
import Delivered from "../../../App/Admin/Authenticated/Dashboard/Main/Orders/Delivered/Delivered";

export default function () {
    return <Routes>
        <Route element={<Admin />} path='/admin'>
            <Route element={<Guest />} path=''>
                <Route element={<Auth />} path="auth">
                    <Route element={<Login />} path="login" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PasswordForgotten />} path="password-forgotten" />
                    <Route element={<ResetPassword />} path="reset-password/:token" />
                </Route>
            </Route>
            <Route element={<Authenticated />} path=''>
                <Route element={<Dashboard />} path="dashboard">
                    <Route element={<User />} path="user">
                        <Route element={<Profile />} path="profile" />
                    </Route>
                    <Route element={<Products />} path="products" />
                    <Route element={<Categories />} path="categories" />
                    <Route element={<Seller />} path="seller">
                        <Route element={<SellerRequests />} path="requests" />
                    </Route>
                    <Route element={<Admins />} path="admins">
                        <Route element={<AdminRequests />} path="requests" />
                    </Route>
                    <Route element={<Orders />} path="orders">
                        <Route element={<Processing />} path="processing" />
                        <Route element={<Unchecked />} path="unchecked" />
                        <Route element={<Delivered />} path="delivered" />
                    </Route>
                </Route>
                <Route element={<Auth />} path="auth">
                    <Route element={<Confirmation />} path="confirmation" />
                    <Route element={<Validation />} path="validation" />
                </Route>
            </Route>
        </Route>
    </Routes>
}