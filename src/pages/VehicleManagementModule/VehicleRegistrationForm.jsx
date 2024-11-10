import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/vehicle-registration-form.css'

const VehicleRegistrationForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    vin: "",
    fuelType: "",
    transmission: "",
    color: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleBackButton=()=>{
   navigate("/vrp");
  }
  return (
    <form onSubmit={handleSubmit} className="vehicle-registration-form">
      <h2>Vehicle Registeration From</h2>
      <div>
        <label>Vehicle Type:</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
        >
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
      </div>

      <div>
        <label>Make:</label>
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Year of Manufacture:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>License Plate Number:</label>
        <input
          type="text"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>VIN:</label>
        <input
          type="text"
          name="vin"
          value={formData.vin}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Fuel Type:</label>
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label>Transmission Type:</label>
        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
        >
          <option value="">Select Transmission Type</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>

      <div>
        <label>Color:</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Upload Vehicle Images:</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="button-container">
      <button type="submit" className="submit-bnt">Register Vehicle</button>
      <button  onClick={handleBackButton} className="back-bnt">Back</button>
      </div>
    </form>
  );
};

export default VehicleRegistrationForm;
