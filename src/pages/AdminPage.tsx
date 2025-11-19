import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { verifyAdminToken, isAdminLoggedIn } from "../utils/adminService";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const hasToken = isAdminLoggedIn();
      console.log('🔍 Checking auth... Has token:', hasToken);
      
      if (hasToken) {
        // If we have a token, assume authenticated until proven otherwise
        // This prevents logout on refresh when network is slow
        setIsAuthenticated(true);
        
        const isValid = await verifyAdminToken();
        console.log('✅ Token valid:', isValid);
        
        // Only logout if explicitly invalid (401 response)
        if (!isValid) {
          // Check if token still exists (verifyAdminToken might have been a network error)
          const stillHasToken = isAdminLoggedIn();
          if (stillHasToken) {
            console.log('⚠️ Verification failed but token exists - keeping user logged in');
            // Keep authenticated, let AdminDashboard handle any errors
            setIsAuthenticated(true);
          } else {
            console.log('🗑️ No token - logging out');
            setIsAuthenticated(false);
            localStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminToken');
          }
        }
      } else {
        console.log('❌ No token found');
        setIsAuthenticated(false);
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
