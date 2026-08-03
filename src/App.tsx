import { Routes, Route } from 'react-router-dom'
import { Toaster as HotToaster } from "react-hot-toast"

//pages
import SplashScreen from './features/SplashScreen'
import LandingPage from './features/LandingPage'
import Login from './features/Login'


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/splashscreen" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <HotToaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  )
}