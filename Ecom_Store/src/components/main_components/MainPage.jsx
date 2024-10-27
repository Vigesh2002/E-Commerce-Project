import { useState } from 'react';
import { auth } from '../firebase_component/FireBase'; // Ensure Firebase auth is imported
import { useNavigate } from 'react-router-dom';
import "../main_components/MainPage.css";

function MainPage() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for controlling popup visibility

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error); // Handle error if logout fails
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true); // Show logout confirmation popup
  };

  const closePopup = () => {
    setShowLogoutPopup(false); // Close the popup
  };

  return (
    <div>
      <h1>Welcome to E-commerce Store</h1>
      {/* Popup for Success Message */}
      <div className="success-popup">
        <p>Successfully logged in!</p>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogoutClick} className="logout-button">Logout</button>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <h3>Are you sure you want to logout?</h3>
            <button onClick={handleLogout} className="yes-button">Yes</button>
            <button onClick={closePopup} className="no-button">No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
