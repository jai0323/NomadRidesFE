import React, { useState } from 'react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit   
 = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Location:', location);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4">
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 border rounded-md"
      />
      <button type="submit" className="bg-[#FB9941] text-black p-2 rounded-md w-56">Search</button>
    </form>
  );
};

export default SearchBar;