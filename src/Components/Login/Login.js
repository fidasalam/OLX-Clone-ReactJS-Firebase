import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Clear form fields
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      // Handle error
      setError(error.message); // Set error message
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>} {/* Display error message if not null */}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
