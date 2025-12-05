import { useAuth } from "../auth/AuthProvider";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";   // make sure path is correct

const Homepage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("/api/users/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <h1 className="homepage-title">👋 Welcome{user?.name ? `, ${user.name}` : ""}!</h1>
        <p className="homepage-subtitle">You're logged in. This is your homepage.</p>

        {user && (
          <div className="homepage-infoBox">
            <p><strong>Email:</strong> {user.email}</p>
            {user.name && <p><strong>Name:</strong> {user.name}</p>}
          </div>
        )}

        <button className="homepage-logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Homepage;
