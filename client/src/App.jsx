import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPages.jsx";
import PaginaPrincipal from "./pages/PaginaPPages.jsx";
import { AuthProvider } from "./context/User.Context.jsx"; // Asegúrate de importar correctamente el AuthProvider
import { HomePage } from "./pages/HomePages.jsx";
import { Publish } from "./pages/PublishPage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
