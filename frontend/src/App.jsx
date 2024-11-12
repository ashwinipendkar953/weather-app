import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import CityDetails from "./pages/CityDetails";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

function App() {
  const { token, isLoading } = useSelector((state) => state.user);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cities/:cityName"
          element={
            <ProtectedRoute>
              <CityDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
