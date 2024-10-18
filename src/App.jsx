
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import logo from './assets/logo.png'

const App = () => {
  const [loginDetails, setDetails] = useState(false);

  if(!loginDetails){
    return(
        <Login setDetails={setDetails}/>
      );
  }
  return (
    <Router>
      <Header/>
      <main className=" m-0">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
