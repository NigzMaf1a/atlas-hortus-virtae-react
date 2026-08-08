import { Toaster as HotToaster } from "react-hot-toast"

// routes
import AppRoutes from "./routes/AppRoutes"

export default function App() {
  return (
    <>
      <AppRoutes />

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