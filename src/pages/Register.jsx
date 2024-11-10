// RegistrationPage.js
import React, { useState } from "react";
import "../styles/register.css"; 
import HeroSlider2 from '../components/UI/HeroSlider2'
function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      // Handle form submission
      console.log("Registration Successful", formData);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (

    <div className="registration-container">
      <HeroSlider2/>
      <form onSubmit={handleSubmit} className="registration-form">
      <h2>Register</h2>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
    
  );
}

export default RegistrationPage;
