import React from 'react';

const LoginForm = ({ toggleForm,setDetails }) => {
  return (
    <div className="form-box login">
      <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
      <form action="#">
        <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
          <input type="text" required />
          <label>Username</label>
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
          <input type="password" required />
          <label>Password</label>
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }} onClick={()=>setDetails(true)}>Login</button>
        <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
          <p>Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
