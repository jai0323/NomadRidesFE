import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-2">{car.name}</h2>
      <p className="text-gray-700">{car.description}</p>
      <p className="text-green-500 font-semibold">Price: ₹{car.price}/day</p>
      <button className="bg-[#FB9941] text-black p-2 rounded-md mt-2">Rent Now</button>
    </div>
  );
};

export default CarCard;