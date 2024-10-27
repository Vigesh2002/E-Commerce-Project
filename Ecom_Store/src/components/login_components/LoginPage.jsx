import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import your Firebase auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { auth } from '../firebase_component/FireBase'; // Adjust this import based on your Firebase configuration
import "../login_components/LoginPage.css"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Navigate to the main page after successful login
            navigate('/main'); // Change '/main' to your actual main page route
        } catch (err) {
            setError(err.message); // Handle Firebase errors
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>} {/* Display error message */}
        </div>
    );
};

export default LoginPage;
