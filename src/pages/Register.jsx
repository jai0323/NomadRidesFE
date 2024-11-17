// RegistrationPage.js
import React, { useState } from "react";
import "../styles/register.css"; 
import HeroSlider2 from '../components/UI/HeroSlider2'
import { kyc, signup, vendorSignup } from "../util/api";
import { useNavigate } from "react-router-dom";
function RegistrationPage() {
  const navigate = useNavigate();
  const [registerAs, setRegisterAs]= useState('customer');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
    city:"",
    address:""
  });
  const [formCustomerData, setFormCustomerData] = useState({
    fullName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: ""
  });

  const [KYCformData, setKYCFormData] = useState({
    id:"",
    aadhaar: "",
    license: "",
  });

  
  const [kyc_section, setKYCSection] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setFormCustomerData({ ...formCustomerData, [name]: value });
  };

  const KYChandleChange = (e) => {
    const { name, value } = e.target;
    setKYCFormData({ ...KYCformData, [name]: value });
  };

  const handleCustomerSubmit = async(e) => {
    e.preventDefault();
    if (formCustomerData.password === formCustomerData.confirmPassword) {
      const response = await signup(formCustomerData);
      console.log("Registration ", response);
      if(response.message=='signup successful'){
        alert("Signup Successful");
        localStorage.setItem("user", JSON.stringify(response.user));
        window.dispatchEvent(new Event("storageChange"));
        setKYCFormData(prevState => ({
          ...prevState,
          id: response.user.id  
        }));
        setKYCSection(true);
        // navigate('/home');
      }
      else if(response.error){
        alert(response.error);
      }
      else{
        alert("Something went wrong");
      }
    } 
    else {
      alert("Passwords do not match!");
    }
  };
  const handleVendorSubmit = async(e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const response = await vendorSignup(formData);
      console.log("Vendor Registration ", response);
      if(response.message=='signup successful'){
        alert("Signup Successful");
        localStorage.setItem("user", JSON.stringify(response.user));
        window.dispatchEvent(new Event("storageChange"));
        setKYCFormData(prevState => ({
          ...prevState,
          id: response.user.id  
        }));
        setKYCSection(true);
        // navigate('/home');
      }
      else if(response.error){
        alert(response.error);
      }
      else{
        alert("Something went wrong");
      }
    } 
    else {
      alert("Passwords do not match!");
    }
  };


  const handleSubmitKYC = async(e) => {
    e.preventDefault();
    console.log("kyc Form Data = ",KYCformData)

      const response = await kyc(KYCformData, registerAs);
      console.log("KYC submit ", response);
      if(response.status=='pending'){
        alert(response.message,'Approval pending');
        navigate('/home');
      }
      else if(response.error){
        alert(response.error);
      }
      else{
        alert("Something went wrong");
      }
    
  };

  return (

    <div className="registration-container ">
      <HeroSlider2/>
      {
        !kyc_section &&
        <div className="registration-form">
        <h2 className="">Register</h2>
          <div className="flex my-3 justify-center items-center rounded-lg overflow-hidden">
            <div onClick={()=>setRegisterAs('customer')} className={`${registerAs === 'customer' ? 'bg-blue-700' : 'bg-black/50 hover:bg-black/50'} flex-1 py-2`}>As Customer</div>
            <div onClick={()=>setRegisterAs('vendor')} className={`${registerAs === 'vendor' ? 'bg-blue-700' : 'bg-black/50 hover:bg-black/50'} flex-1 py-2`}>As Vendor</div>
          </div>
          {
            registerAs=='customer'&&
            <form onSubmit={handleCustomerSubmit} >
              <div className="flex justify-between gap-4">
                <div className="form-group">
                  <label className="text-white">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formCustomerData.fullName}
                    onChange={handleCustomerChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formCustomerData.email}
                    onChange={handleCustomerChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <div className="form-group">
                  <label className="text-white">Phone:</label>
                  <input
                    type="phone"
                    name="phone"
                    value={formCustomerData.phone}
                    onChange={handleCustomerChange}
                    required
                    />
                </div>
                <div className="form-group">
                  <label className="text-white">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formCustomerData.password}
                    onChange={handleCustomerChange}
                    required
                    />
                </div>
              </div>
              <div className="form-group">
                <label className="text-white">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formCustomerData.confirmPassword}
                  onChange={handleCustomerChange}
                  required
                  />
              </div>
              <button type="submit" className="register-button  ">Register</button>
            </form>
          }
          { 
            registerAs=='vendor'&&
            <>
              <form onSubmit={handleVendorSubmit} >
                <div className="flex justify-between gap-4">

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
                </div>
                <div className={`flex justify-between gap-4`}>
                  <div className="form-group">
                      <label className="text-white">City:</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                  </div>
                  <div className="form-group">
                    <label className="text-white">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-4">  
                  
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
                </div>
                <div className="form-group ">
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
            </>
          }
      </div>
      }
      { 
        kyc_section &&
        <form onSubmit={handleSubmitKYC} className="registration-form">
        <h2 className="">Complete KYC</h2>
          <div className="form-group">
            <label className="text-white">Aadhaar</label>
            <input
              type="text"
              name="aadhaar"
              value={KYCformData.aadhaar}
              onChange={KYChandleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white">{registerAs=='vendor'?'PAN':'License'}</label>
            <input
              className="uppercase"
              type="text"
              name="license"
              value={KYCformData.license}
              onChange={KYChandleChange}
              required
            />
          </div>
         
          <button type="submit" className="register-button  ">Submit</button>
        </form>
      }
    </div>
    
  );
}

export default RegistrationPage;
