import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import AdminProducts from '../pages/AdminProducts'
import AdminOrders from '../pages/AdminOrders'
import Users from '../pages/Users'
import AddProducts from '../pages/AddProduct'
import EditProducts from '../pages/EditProducts'
import AdminNavbar from './AdminNavbar'

function AdminRoutes() {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/products"          element={<AdminProducts />} />
        <Route path="/products/add"      element={<AddProducts />} />
        <Route path="/orders"            element={<AdminOrders />} />
        <Route path="/users"             element={<Users />} />
        <Route path="/products/edit/:id" element={<EditProducts />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes