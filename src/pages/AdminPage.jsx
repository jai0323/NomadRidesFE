// src/AdminPage.js
import React, { useState } from 'react';
import '../styles/adminpage.css';

const AdminPage = () => {
  const [carList, setCarList] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Dashboard</h1>

      <div className="section">
        <h2>Manage Cars</h2>
        <button onClick={() => console.log("Add Car")}>Add Car</button>
        <ul>
          {carList.map((car) => (
            <li key={car.id} className="list-item">
              <div className="item-info">{car.name} - ${car.price}</div>
              <button>Mark as {car.isAvailable ? "Unavailable" : "Available"}</button>
              <button>Set Pricing</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Manage Bikes</h2>
        <button onClick={() => console.log("Add Bike")}>Add Bike</button>
        <ul>
          {bikeList.map((bike) => (
            <li key={bike.id} className="list-item">
              <div className="item-info">{bike.name} - ${bike.price}</div>
              <button>Mark as {bike.isAvailable ? "Unavailable" : "Available"}</button>
              <button>Set Pricing</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Manage Vendors</h2>
        <button onClick={() => console.log("Add Vendor")}>Add Vendor</button>
        <ul>
          {vendorList.map((vendor) => (
            <li key={vendor.id} className="list-item">
              <div className="item-info">{vendor.name} - {vendor.contact}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="section set-discount">
        <h2>Discounts</h2>
        <button onClick={() => console.log("Set Discount")}>Set Discount</button>
      </div>
    </div>
  );
};

export default AdminPage;
