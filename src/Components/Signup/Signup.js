import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth, firestore } from '../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";


export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await addDoc(collection(firestore, "users"), {
      id: user.uid,
      username: username,
      phone: phone,
    });
    navigate('/login');
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="name"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          {/* Specify type attribute for button */}
          <button type="submit">Signup</button>
        </form>
        {/* Use Link component for navigation */}
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
