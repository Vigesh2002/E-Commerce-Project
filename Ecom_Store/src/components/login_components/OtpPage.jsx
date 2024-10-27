// OtpPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase_component/FireBase"; // Ensure you have the correct path to your Firebase configuration
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default styles for toast
import "../login_components/OtpPage.css"; // Your custom CSS

function OtpPage() {
  const [mobile, setMobile] = useState(""); // State to store the mobile number
  const [otp, setOtp] = useState(""); // State to store the generated OTP
  const [isOtpModalVisible, setOtpModalVisible] = useState(false); // Control modal visibility
  const [userOtp, setUserOtp] = useState(""); // Store OTP entered by the user
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle OTP generation and submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
    setOtp(generatedOtp); // Set OTP state
    console.log("Generated OTP:", generatedOtp); // Log generated OTP
    setOtpModalVisible(true); // Show OTP modal
    toast.success("OTP sent to your mobile number!"); // Show success toast
  };

  // Function to handle OTP verification
  const handleOtpSubmit = async () => {
    console.log("User-entered OTP:", userOtp); // Log user-entered OTP
    if (userOtp === otp) {
      const user = auth.currentUser; // Get currently logged-in user
      await updateDoc(doc(db, "users", user.uid), {
        otpVerified: true // Update Firestore to mark OTP as verified
      });
      toast.success("OTP verified successfully!"); // Show success toast
      navigate('/mainpage'); // Navigate to MainPage upon OTP verification
    } else {
      toast.error("Incorrect OTP, please try again."); // Show error toast
    }
    setOtpModalVisible(false); // Hide modal
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>Enter your mobile number</h2>
        <PhoneInput
          country={'in'}
          value={mobile}
          onChange={setMobile}
          inputStyle={{
            width: '100%',
            padding: '12px 45px',
            margin: '15px 0',
            borderRadius: '6px',
            backgroundColor: '#333',
            color: '#fff',
            border: '1px solid #444',
          }}
          buttonStyle={{
            backgroundColor: '#444',
            border: 'none',
          }}
          dropdownStyle={{
            backgroundColor: '#333',
            color: '#fff',
            textAlign: "left"
          }}
        />
        <button className="otp-submit-btn" type="submit">Submit</button>
      </form>

      {/* OTP Modal */}
      {isOtpModalVisible && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h3>Enter OTP</h3>
            <p>Please enter the OTP sent to your mobile number.</p>
            <div className="otp-input-container">
              {Array(4).fill("").map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input-box"
                  onChange={(e) => {
                    const newOtp = userOtp.split("");
                    newOtp[index] = e.target.value;
                    setUserOtp(newOtp.join(""));
                  }}
                  value={userOtp[index] || ""}
                />
              ))}
            </div>
            <button className="otp-submit-btn" onClick={handleOtpSubmit}>
              Verify OTP
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
}

export default OtpPage;
