import React, { useState } from "react";
import "../../styles/vehicle-maintenance.css"
import { useLocation, useNavigate } from "react-router-dom";

const VehicleMaintenanceForm = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;
  const type = location.state?.type;
  // console.log(vehicle.photo)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: type,
    brand: vehicle.brand,
    model: vehicle.model,
    registration_date: new Date(vehicle.registration_date).toISOString().split('T')[0],
    registration_no: vehicle.registration_no,
    last_service_date:new Date(vehicle.last_service_date).toISOString().split('T')[0],
    type: vehicle.type,
    fuel_type: vehicle.fuel_type,
    photo: vehicle.photo,
  });
  const [imageFile, setImageFile] = useState(null);

  // Handle image file selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Save file directly
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevDetails) => ({
          ...prevDetails,
          photo: reader.result.split(',')[1], // For preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const vendor = JSON.parse(localStorage.getItem("user"));
  
    
    try {
      formData.vendor_id = vendor.id;
      const response = await addVehicle(formData, formData.vehicleType); // API call
      if (response?.message) {
        alert(response.message);
        navigate("/vendor");
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error("Error submitting vehicle data:", error);
      alert("Error occurred while registering vehicle.");
    }
  };
  

  const handleBackButton=({vehicle})=>{
   navigate("/vendor");
  }
  return (
    <form onSubmit={handleSubmit} className="vehicle-registration-form">
      <h2>Vehicle Details From</h2>
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
        <label>Manufacturer:</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
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
        <label>License Plate Number:</label>
        <input
          type="text"
          name="registration_no"
          value={formData.registration_no}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Registration Date :</label>
        <input
          type="date"
          name="registration_date"
          value={formData.registration_date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Servicing Date :</label>
        <input
          type="date"
          name="last_service_date"
          value={formData.last_service_date}
          onChange={handleChange}
          required
        />
      </div>


      <div>
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select The Type</option>
          { 
            formData.vehicleType == 'Bike' &&
            <>
            <option value="Mountain">Mountain</option>
            <option value="Sports">Sports</option>
            <option value="Standard">Standard</option>
            <option value="Scooter">Scooter</option>
            </>
          }
          { 
            formData.vehicleType == 'Car' &&
            <>
            <option value="Sedan">Sedan</option>
            <option value="Sports">Sports</option>
            <option value="SUV">SUV</option>
            <option value="XUV">XUV</option>
            <option value="Hatchback">Hatchback</option>
            </>
          }
        </select>
      </div>

      <div>
        <label>Fuel Type:</label>
        <select
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleChange}
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="CNG">CNG</option>
        </select>
      </div>

      <div>
        <label>Upload Vehicle photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      
      {vehicle.photo && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h5 className="text-left w-full">Image Preview:</h5>
          <img src={formData.photo} alt="Preview" style={{ width: '200px', height: 'auto' }} />

        </div>
      )}

      <div className="button-container">
      <button type="submit" className="submit-bnt">Update details</button>
      <button  onClick={handleBackButton} className="back-bnt">Back</button>
      </div>
    </form>
  );
};

export default VehicleMaintenanceForm;
