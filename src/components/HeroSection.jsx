import React from 'react';
import heroImg from '../assets/heroimg.jpg';
import SearchBar from './SearchBar';
const HeroSection = () => {
  return (
    <div className='relative w-screen h-[70vh]'>
        <img src={heroImg} alt="" className='w-screen h-full' />
        <div className='absolute inset-0 z-10 top-14 flex flex-col justify-center items-center '>
            <h1 className='text-5xl mb-20 font-semibold text-center leading-[60px]'>Providing the best travel <br/>experience for you</h1>
            <SearchBar />
        </div>
    </div>
  );
};

export default HeroSection;
