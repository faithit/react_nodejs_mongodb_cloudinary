import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MessagesList from "./components/admin/MessagesList.jsx";
function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      {/* Dashboard */}
      <Route path="/dashboard/*" element={<AdminDashboard />} />

      {/* Catch-all → redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;