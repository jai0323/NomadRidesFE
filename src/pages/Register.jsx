// RegistrationPage.js
import React, { useState } from "react";
import "../styles/register.css"; 
import HeroSlider2 from '../components/UI/HeroSlider2'
import { signup } from "../util/api";
function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const response = signup(formData);
      if(response.message=='signup successful'){
        alert("Signup Successful");
        navigate('/home');
      }
      else if(response.error){
        alert(response.error);
      }
      else if(response.message=='invalid password'){
        alert("Invalid Password");
      }
      else{
        alert("Something went wrong");
      }
      console.log("Registration ", response.error);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (

    <div className="registration-container">
      <HeroSlider2/>
      <form onSubmit={handleSubmit} className="registration-form">
      <h2 className="">Register</h2>
        <div className="form-group">
          <label className="text-white">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-white">Phone:</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-white">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-white">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button  ">Register</button>
      </form>
    </div>
    
  );
}

export default RegistrationPage;
