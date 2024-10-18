import React from 'react';

const RegisterForm = ({ toggleForm,setDetails }) => {
  return (
    <div className="form-box register">
      <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
      <form action="#">
        <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
          <input type="text" required />
          <label>Username</label>
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
          <input type="email" required />
          <label>Email</label>
          <i className="bx bxs-envelope"></i>
        </div>
        <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
          <input type="password" required />
          <label>Password</label>
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }} onClick={()=>setDetails(true)}>Sign Up</button>
        <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
          <p>Already have an account? <a href="#" onClick={toggleForm}>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
