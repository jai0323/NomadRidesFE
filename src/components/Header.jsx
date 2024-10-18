import React from 'react';
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <header className="bg-[#000] py-4 px-8 text-black flex items-center">
    <img src={logo} alt="LOGO" className='w-36'/>
    <div className='text-[#FB9941]'>
      <h1 className="text-5xl font-bold w-full">Nomad Rides <span className='text-lg font-semibold px-5'>Bike and Car rental</span>
      </h1>
      <nav className="mt-4">
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>   

        </ul>
      </nav>

    </div>
    </header>
  );
};

export default Header;