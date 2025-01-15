import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthPage from '../page/AuthPage';
import ProductDetails from '../page/ProductDetails';
import Cart from '../page/Cart';
import Login from '../component/Auth/Login';
import Signup from '../component/Auth/SignUp';
import HomePage from '../page/HomePage';
import Dashboard from '../page/Dashboard';
import PrivateRoute from '../component/Auth/PrivateRoute';
import Profile from '../page/Profile';
import CategoryManagement from '../component/admin/CategoryManagement';
import AddCategoryForm from '../component/admin/NewCategory';
import CreateProduct from '../component/seller/CreateProduct';
import ProductManagement from '../component/seller/productManagement';
import NotFound from '../page/NotFound';
import Checkout from '../page/Checkout';
import MyOrder from '../page/MyOrder';
import SellerOrder from '../component/seller/SellerOrder';
import DashBoardCart from '../component/common/DashBoardCart';


export default function Router() {
  const { profileData } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("profileData ", profileData)
  }, []);

  return (
    <Routes>
      {/* Protect Dashboard route */}
    

      
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>

      <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/dashboard/order" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
      <Route path="/dashboard/cart" element={<PrivateRoute><DashBoardCart /></PrivateRoute>} />

        
        {/* Admin Role Routes */}
        {profileData?.role === "admin" && (
          <>
            <Route path="/dashboard/categories" element={<PrivateRoute><CategoryManagement /></PrivateRoute>} />
            <Route path="/dashboard/newcategory" element={<PrivateRoute><AddCategoryForm /></PrivateRoute>} />
          </>
        )}

        {/* Seller Role Routes */}
        {profileData?.role !== "customer" && (
          <>
            <Route path="/dashboard/products/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
            <Route path="/dashboard/products" element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
          </>
        )}

        {profileData?.role !== "seller" || profileData?.role !== "admin" && (
          <>
          <Route path="/dashboard/order-tracking" element={<PrivateRoute><SellerOrder /></PrivateRoute>} />
          </>
        )}
        
      </Route>

      {/* Other routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:productCategory/:productName/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/:role" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
      


    </Routes>
  );
}
