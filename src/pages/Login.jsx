import React, { useState } from 'react';
import '../styles/login.css';
import { Navigate, useNavigate } from "react-router-dom";
import HeroSlider2 from '../components/UI/HeroSlider2';
import { signin } from '../util/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const navigate = useNavigate();

   const handleLogin = async(e) => {
    
    e.preventDefault();
    let response = await signin(email, password,role);
    console.log("Login ", response.user);

    if(response.message=='signin successful'){
      alert("Signin Successful");
      localStorage.setItem("user", JSON.stringify(response.user));
      window.dispatchEvent(new Event("storageChange"));
      if(role=='customer')
        navigate('/home');
      else if(role=='admin')
        navigate('/admin');       
      else if(role=='vendor')
        navigate('/vendor');
    }
    else if(response.error=='not found'){
      alert(response.message);
    }
    else if(response.message=='invalid password'){
      alert("Invalid Password");
    }
    else{
      alert("Something went wrong");
    }
  };
  
  const gotoRegister=()=>{
    Navigate('/register');
  }

  
  return (
    <>
      <div className="login-container">
        <HeroSlider2 />
        <div className="login-form ">
          <h2 className=''>Login </h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className='text-white'>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label className='text-white'>Password</label>
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
              <label className='text-white'>Select Role:</label>
              <div >
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={() => setRole('customer')}
                  
                />
                <label htmlFor="customer" className='op text-white'>Customer</label>
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
                <label htmlFor="vendor" className='op text-white'>Vendor</label>
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
                <label htmlFor="admin" className='op text-white'>Admin</label>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="login-button" >Login</button>
                <button type="button" className="register-button" onClick={gotoRegister}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
