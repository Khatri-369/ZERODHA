import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const storedToken = localStorage.getItem("token");

      try {
        const headers = storedToken
          ? { Authorization: `Bearer ${storedToken}` }
          : {};

        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          method: "GET",
          credentials: "include",
          headers,
        });

        const data = await res.json();

        if (isMounted) {
          if (data && data.success && data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setAuthState({
              isLoading: false,
              isAuthenticated: true,
              user: data.user,
            });
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setAuthState({
              isLoading: false,
              isAuthenticated: false,
              user: null,
            });
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (isMounted) {
          // If offline/error but token & cached user exist, grant fallback access
          const cachedUser = localStorage.getItem("user");
          if (storedToken && cachedUser) {
            try {
              setAuthState({
                isLoading: false,
                isAuthenticated: true,
                user: JSON.parse(cachedUser),
              });
              return;
            } catch (e) {}
          }

          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (authState.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#fafafa",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <img
          src="logo.png"
          alt="Zerodha Kite"
          style={{ width: "48px", marginBottom: "16px", opacity: 0.9 }}
        />
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "3px solid #e0e0e0",
            borderTop: "3px solid #ff5722",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "14px",
          }}
        />
        <p style={{ color: "#777", fontSize: "0.9rem", margin: 0, fontWeight: 500 }}>
          Verifying Kite session...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    // Redirect to Kite login, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
