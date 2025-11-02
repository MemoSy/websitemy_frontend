import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { verifyAdminToken, isAdminLoggedIn } from "../utils/adminService";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAdminLoggedIn()) {
        const isValid = await verifyAdminToken();
        setIsAuthenticated(isValid);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">جاري التحقق من الصلاحيات...</div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default AdminPage;
