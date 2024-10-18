import React from 'react';
import SearchBar from '../components/SearchBar';
import BikeCard from '../components/BikeCard';
import CarCard from '../components/CarCard';
import image1 from '../assets/mountainBike.jpeg';
import image2 from '../assets/roadBike.jpeg';
import car1 from '../assets/car1.jpeg';
import car2 from '../assets/car2.jpeg';
import HeroSection from '../components/HeroSection';
const Home = () => {
const bikes = [
   { id: 1,
    name: 'Mountain Bike',
    image: image1,
    description: 'A rugged bike for off-road adventures.',
    price: 600
  },
  {
    id: 2,
    name: 'Road Bike',
    image: image2,
    description: 'A sleek bike for long-distance rides.',
    price: 300
  },
  {
    id: 3,
    name: 'Sports Bike',
    image: image2,
    description: 'A sleek bike for long-distance rides.',
    price: 300
  },
  ];
  const cars = [
    // Car data
    {
        id: 1,
        name: 'Sedan',
        image: car1,
        description: 'A comfortable and fuel-efficient car.',
        price: 1500
      },
      {
        id: 2,
        name: 'SUV',
        image: car1,
        description: 'A spacious and versatile vehicle.',
        price: 1000
      },
      {
        id: 2,
        name: 'Sports Car',
        image: car2,
        description: 'A spacious and versatile vehicle.',
        price: 1000
      },
  ];

  return (
    <>
    <div className=" w-lvw">
      <HeroSection />
      <div className='px-5'>
        <h2 className="text-2xl font-bold mt-4 ">Bikes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {bikes.map((bike) => (
            <BikeCard bike={bike} key={bike.id} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-4">Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <CarCard car={car} key={car.id} />
          ))}
        </div> 

      </div>
    </div>
    </>
  );
};

export default Home;