import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/user/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch user profile", e);
      });
  }, []);

  const handleProfileClick = () => {
    setIsProfileDropDownOpen(!isProfileDropDownOpen);
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3002/logout", { credentials: "include" });
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
    window.location.href = "http://localhost:3000/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const displayName = user?.username ? user.username.toUpperCase() : "KHATRI";
  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : "KH";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => { handleMenuClick(0) }}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => { handleMenuClick(1) }}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => { handleMenuClick(2) }}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => { handleMenuClick(3) }}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => { handleMenuClick(4) }}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => { handleMenuClick(5) }}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
            <div className="avatar">{initials}</div>
            <p className="username">{displayName}</p>
          </div>

          {isProfileDropDownOpen && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                background: "#ffffff",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
                borderRadius: "8px",
                padding: "12px 16px",
                minWidth: "180px",
                zIndex: 1000,
                border: "1px solid #eaeaea",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <p style={{ margin: 0, fontWeight: "600", fontSize: "0.85rem", color: "#333" }}>
                  {displayName}
                </p>
                {user?.email && (
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#777" }}>
                    {user.email}
                  </p>
                )}
              </div>
              <hr style={{ margin: "8px 0", height: "1px", background: "#eee", border: "none" }} />
              <a
                href="http://localhost:3000"
                style={{
                  display: "block",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  color: "#387ed1",
                  marginBottom: "8px",
                }}
              >
                Zerodha Home
              </a>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "#ff4d4f",
                  border: "none",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;