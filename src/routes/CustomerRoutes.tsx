import { Routes, Route } from "react-router-dom"

// context
import { CartProvider } from "../hooks/util/CartContext"

// customer pages
import CustomerHome from "../features/home/CustomerHome"
import CustomerProducts from "../features/users/customer/CustomerProducts"

export default function CustomerRoutes() {
    return (
        <CartProvider>
            <Routes>
                <Route
                    path="home"
                    element={<CustomerHome />}
                />

                <Route
                    path="products"
                    element={<CustomerProducts />}
                />
            </Routes>
        </CartProvider>
    )
}