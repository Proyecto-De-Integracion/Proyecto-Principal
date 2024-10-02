import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublishPage from "./pages/PublishPage";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <PrivateRoute>
              <PublishPage />
            </PrivateRoute>
          }
        />{" "}
        <Route path="/profile" element={<PrivateRoute></PrivateRoute>} />
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
        <Route path="/" element={"holis"} />
      </Routes>
    </Router>
  );
};

export default App;
