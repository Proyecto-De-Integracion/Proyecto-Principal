import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPages.jsx";
import PaginaPrincipal from "./pages/PaginaPPages.jsx";
import { AuthProvider } from "./context/User.Context.jsx"; // Asegúrate de importar correctamente el AuthProvider
import { HomePages } from "./pages/HomePages.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePages />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
