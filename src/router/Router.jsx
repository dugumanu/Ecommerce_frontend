import React from 'react';
import { Route, Routes } from 'react-router-dom';

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

export default function Router() {
  return (
    <Routes>
      {/* Protect Dashboard route */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route path="/dashboard/profile" element={ <PrivateRoute> <Profile /></PrivateRoute>  } />
        <Route path="/dashboard/categories" element={ <PrivateRoute><CategoryManagement /></PrivateRoute> } />
        <Route path="/dashboard/newcategory" element={ <PrivateRoute><AddCategoryForm /></PrivateRoute> } />


      </Route>

      {/* Other routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/product/:productCategory/:productName/:productId' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register/:role' element={<Signup />} />
    </Routes>
  );
}
