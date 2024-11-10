import React, { useState } from 'react';
import '../styles/login.css';
import { Navigate } from "react-router-dom";
import HeroSlider2 from '../components/UI/HeroSlider2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., API call to authenticate the user
    console.log("Login successful", { email, password, role });
  };
  
  const gotoRegister=()=>{
    Navigate('/register');
  }
  return (
    <>
      <div className="login-container">
        <HeroSlider2 />
        <div className="login-form">
          <h2>Login </h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {/* Role Selection */}
            <div className="form-group role-selection">
              <label>Select Role:</label>
              <div>
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={() => setRole('customer')}
                />
                <label htmlFor="customer" className='op'>Customer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="vendor"
                  name="role"
                  value="vendor"
                  checked={role === 'vendor'}
                  onChange={() => setRole('vendor')}
                />
                <label htmlFor="vendor" className='op'>Vendor</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                <label htmlFor="admin" className='op'>Admin</label>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="login-button">Login</button>
                <button type="button" className="register-button" onClick={gotoRegister}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
