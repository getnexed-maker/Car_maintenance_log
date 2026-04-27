import Cars from "./pages/Cars.jsx"
import Login from "./pages/Login.jsx"
import Maintenance from "./pages/Maintenance.jsx"
import Register from "./pages/Register.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"







function App() {

  return ( <div>
<BrowserRouter>
    <Routes>
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



    <div>
      <h1>Car maintenance</h1>
    </div>
    </div>
  )
}

export default App
