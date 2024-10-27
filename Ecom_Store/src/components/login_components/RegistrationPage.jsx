import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase_component/FireBase"; // Import Firebase
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { toast, ToastContainer } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import "../login_components/RegistrationPage.css"; // Import CSS for styling

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        dob,
        email,
        gender,
        otpVerified: false, // OTP verification flag
      });

      // Show success toast message
      toast.success("Registration successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Automatically close after 3 seconds
      });

      // Redirect to Login Page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Wait for 3 seconds to show the toast before navigating

    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed, please try again.");
      toast.error("Registration failed, please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Automatically close after 3 seconds
      });
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="register">Register Form</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <label>Username</label>
        <input 
          type="text" 
          name="username" 
          placeholder="Enter your username" 
          required 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label>Date of Birth</label>
        <input 
          type="date" 
          name="dob" 
          required 
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="Enter your email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label>Password</label>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter your password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <label>Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm your password" 
          required 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <label>Gender</label>
        <select 
          name="gender" 
          required 
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {/* ToastContainer to render toast messages */}
      <ToastContainer />
    </div>
  );
}

export default RegistrationPage;
