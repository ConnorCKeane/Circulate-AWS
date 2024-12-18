import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated by checking localStorage for a token
  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  // Sign out function to clear token and navigate to login page
  const handleSignOut = () => {
    localStorage.removeItem('id_token'); // Remove token from local storage
    setIsAuthenticated(false); // Update state to reflect sign-out
    navigate('/'); // Redirect to home or login page
  };

  const handleMouseEnter = (link: string) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = (isActive: boolean, link: string) => ({
    display: "inline",
    textAlign: "center",
    color: isActive ? "white" : "white",
    fontSize: hoveredLink === link || isActive ? 26 : 22, // Maintain larger size if active or hovered
    fontFamily: "'SF Pro Display', sans-serif", // Updated font family
    fontWeight: isActive ? "bold" : "500",
    lineHeight: "30px",
    letterSpacing: 1.62,
    textDecoration: "none",
    margin: "0 20px",
    transition: "font-size 0.3s ease",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#2B303A",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        position: "sticky", // Make the header sticky
        top: 0, // Stick to the top of the page
        zIndex: 1000, // Ensure the header appears above other content
        fontFamily: "'SF Pro Display', sans-serif", // Apply the font globally to the header
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center", width: "200px", position: "absolute", left: "" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "100px" }} />
      </div>

      {/* Center navigation links */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "space-between", // Space the links evenly
          width: "700px", // Set a fixed width for consistent spacing
          color: 'white'
        }}
      >
        <NavLink
          to="/Products"
          style={({ isActive }) => linkStyle(isActive, "Products")}
          onMouseEnter={() => handleMouseEnter("Products")}
          onMouseLeave={handleMouseLeave}
        >
          Products
        </NavLink>

        <NavLink
          to="/Home"
          style={({ isActive }) => linkStyle(isActive, "Home")}
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </NavLink>

        <NavLink
          to="/AboutUs"
          style={({ isActive }) => linkStyle(isActive, "AboutUs")}
          onMouseEnter={() => handleMouseEnter("AboutUs")}
          onMouseLeave={handleMouseLeave}
        >
          About Us
        </NavLink>
      </div>

      {/* Right side - Sign Out if authenticated, else Sign In */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingRight: "20px" }}>
        {isAuthenticated ? (
          <span
            style={linkStyle(false, "SignOut")}
            onClick={handleSignOut}
            onMouseEnter={() => handleMouseEnter("SignOut")}
            onMouseLeave={handleMouseLeave}
          >
            Sign Out
          </span>
        ) : (
          <NavLink
            to="https://circulatesignup.auth.us-east-1.amazoncognito.com/login?client_id=7s7o7e3tm5e8220l8f3947n8rj&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback" 
            style={({ isActive }) => linkStyle(isActive, "SignIn")}
            onMouseEnter={() => handleMouseEnter("SignIn")}
            onMouseLeave={handleMouseLeave}
          >
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
