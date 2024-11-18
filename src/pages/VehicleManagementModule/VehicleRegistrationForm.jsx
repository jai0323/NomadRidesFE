import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/vehicle-registration-form.css'
import { addVehicle } from "../../util/api";

const VehicleRegistrationForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    brand: "",
    model: "",
    registration_date: "",
    registration_no: "",
    last_service_date:"",
    type: "",
    fuel_type: "",
    photo: "",
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
  
    // Create a FormData object
    // const data = new FormData();
    // data.append('vendor_id', vendor.id);
    // data.append('vehicleType', formData.vehicleType);
    // data.append('brand', formData.brand);
    // data.append('model', formData.model);
    // data.append('registration_date', formData.registration_date);
    // data.append('registration_no', formData.registration_no);
    // data.append('last_service_date', formData.last_service_date);
    // data.append('type', formData.type);
    // data.append('fuel_type', formData.fuel_type);
  
    // if (imageFile) {
    //   data.append('photo', imageFile); // Append the file directly
    // }
  
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
  

  const handleBackButton=()=>{
   navigate("/vendor");
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
      
      {imageFile && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h5 className="text-left w-full">Image Preview:</h5>
          <img src={`data:image/png;base64,${formData.photo}`} alt="Preview" style={{ width: '200px' }} />
        </div>
      )}

      <div className="button-container">
      <button type="submit" className="submit-bnt">Register Vehicle</button>
      <button  onClick={handleBackButton} className="back-bnt">Back</button>
      </div>
    </form>
  );
};

export default VehicleRegistrationForm;
