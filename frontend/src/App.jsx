import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/Home.jsx";
import Publish from "./pages/PublishPage.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import PublicRoute from "./router/PublicRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <PrivateRoute>
              <Publish />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
