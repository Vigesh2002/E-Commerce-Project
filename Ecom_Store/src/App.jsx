import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './components/firebase_component/FireBase'; // Import Firebase Auth
import RegistrationPage from './components/login_components/RegistrationPage';
import OtpPage from './components/login_components/OtpPage';
import LoginPage from './components/login_components/LoginPage';
import MainPage from './components/main_components/MainPage'; // Main page component

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/mainpage'); // Redirect to main page if user is authenticated
      } else {
        navigate('/login'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  );
}

export default App;