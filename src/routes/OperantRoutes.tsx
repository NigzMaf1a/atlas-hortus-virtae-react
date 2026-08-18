import { Routes, Route } from "react-router-dom"

//pages
import OperantHome from "../features/home/OperantHome"
import OperantOrders from "../features/users/operant/OperantOrders"
import OperantProducts from "../features/users/operant/OperantProducts"

//context
import { OperantProvider } from "@/contexts/useOperantContext"

export default function OperantRoutes() {
    return (
        <OperantProvider>
            <Routes>
                <Route
                    path="home"
                    element={<OperantHome />}
                />

                <Route
                    path="orders"
                    element={<OperantOrders />}
                />

                <Route
                    path="products"
                    element={<OperantProducts />}
                />
            </Routes>
        </OperantProvider>
    )
}
