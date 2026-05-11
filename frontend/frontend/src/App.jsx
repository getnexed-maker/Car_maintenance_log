import Cars from "./pages/Cars.jsx"
import Login from "./pages/Login.jsx"
import Maintenance from "./pages/Maintenance.jsx"
import Register from "./pages/Register.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"







function App() {

  return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cars" element={
      <ProtectedRoute>
      <Cars/>
      </ProtectedRoute>
      }/>

      <Route path="/maintenance" element={
      <ProtectedRoute>
      <Maintenance/>
      </ProtectedRoute>
      }/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
  


  </Routes>
    </BrowserRouter>
  )
}

export default App
