import { Routes, Route } from "react-router-dom"

// pages
import SplashScreen from "../features/SplashScreen"
import LandingPage from "../features/LandingPage"
import Login from "../features/Login"

// routes
import CustomerRoutes from "./CustomerRoutes"
import OperantRoutes from "./OperantRoutes"

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/splashscreen"
                element={<SplashScreen />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            {/* Customer routes */}
            <Route
                path="/customer/*"
                element={<CustomerRoutes />}
            />

            <Route
                path="/operant/*"
                element={<CustomerRoutes />}
            />
        </Routes>
    )
}