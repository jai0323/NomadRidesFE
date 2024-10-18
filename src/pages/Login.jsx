import React, { useState } from 'react';
import './login.css'; // Import your CSS file
import logo from '../assets/logo.png'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({setDetails}) =>{
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const [visible, setVisible] = useState(true);
    const [visibleFrom, setVisibleFrom] = useState(true);

    const toggleForm = () => {
      
      setIsLoginFormActive(!isLoginFormActive);
      setTimeout(() => {
        setVisible(!visible)
      }, 500);
     
    };
  
    return (
      <div className='bg-[#000] w-screen h-screen flex justify-center items-center'> 
      <div className={`wrapper ${isLoginFormActive ? '' : 'active'}`}>
        <span className="rotate-bg"></span>
        <span className="rotate-bg2"></span>
  
        {visible ? (
          <>
            
              <LoginForm toggleForm={toggleForm} setDetails={setDetails}/>
            <div className="info-text login">
              <h2 className="animation text-white text-3xl font-bold" style={{ '--i': 0, '--j': 20 }}>
                  <img src={logo} alt="LOGO" className='w-50'/>               
              </h2>
              {/* <p className="animation" style={{ '--i': 1, '--j': 21 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p> */}
            </div>
          </>
        ) : (
          <>
            {
              visibleFrom &&
              <RegisterForm toggleForm={toggleForm}  setDetails={setDetails}/>}
            <div className="info-text register">
              <h2 className="animation  text-white text-3xl font-bold " style={{ '--i': 17, '--j': 0 }}>
                  <img src={logo} alt="LOGO" className='w-50'/>
              </h2>
              {/* <p className="animation" style={{ '--i': 18, '--j': 1 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p> */}
            </div>
          </>
        )}
      </div>
      </div>
    );
}

export default Login;