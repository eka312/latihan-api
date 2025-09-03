import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataBuku2 from "./pages/buku2";
import DataAnggota from "./pages/anggota";
import Login from "./pages/login";
import Register from "./pages/register";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buku" element={<DataBuku2 />} />
          <Route path="/anggota" element={<DataAnggota />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default  App;

