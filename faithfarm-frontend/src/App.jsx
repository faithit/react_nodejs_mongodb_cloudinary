import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <Routes>
      {/* Redirect root → dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;