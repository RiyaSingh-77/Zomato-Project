import React from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();



    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "https://zomato-backend-ajqm.onrender.com/api/auth/user/login",
        { email, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );

      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        navigate("/home"); // Redirect to home after successful login
      } else {
        console.error('Login failed', response.data);
        alert(response.data?.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed. Check credentials or server.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;