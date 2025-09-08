import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataBuku2 from "./pages/buku2";
import DataAnggota from "./pages/anggota";
import Login from "./pages/login";
// import Register from "./pages/register";
import PrivateRoute from "./komponen/ProtectedRoute";
import PublicRoute from "./komponen/publicRoute";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* Route yang dilindungi */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/buku" element={<PrivateRoute><DataBuku2 /></PrivateRoute>} />
        <Route path="/anggota" element={<PrivateRoute><DataAnggota /></PrivateRoute>} />

        {/* Route public */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        {/* <Route path="/register" element={<Register />} /> */}

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default  App;

