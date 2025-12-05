import { useAuth } from "../auth/AuthProvider";
import "../styles/profile.css";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">👋 Hello {user?.name ? `, ${user.name}` : ""}!</h1>
        <p className="profile-subtitle">You're Currently logged in, Details ⬇️</p>

        {user && (
          <div className="profile-infoBox">
            <p><strong>Email:</strong> {user.email}</p>
            {user.name && <p><strong>Name:</strong> {user.name}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
