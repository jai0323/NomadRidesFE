import React, { useState } from "react";
import '../../styles/vehicle-availability.css'
const VehicleAvailabilityForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    availabilityStatus: "Available",
    rentalStartDate: "",
    rentalEndDate: "",
    specialConditions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="availability-form">
      <div>
        <label>Vehicle ID or License Plate:</label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Availability Status:</label>
        <select
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="In Maintenance">In Maintenance</option>
          <option value="Reserved">Reserved</option>
        </select>
      </div>
      {(formData.availabilityStatus === "Rented" || formData.availabilityStatus === "Reserved") && (
        <div>
          <label>Rental Start Date:</label>
          <input
            type="date"
            name="rentalStartDate"
            value={formData.rentalStartDate}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {(formData.availabilityStatus === "Rented" || formData.availabilityStatus === "Reserved") && (
        <div>
          <label>Rental End Date:</label>
          <input
            type="date"
            name="rentalEndDate"
            value={formData.rentalEndDate}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div>
        <label>Special Conditions or Notes:</label>
        <textarea
          name="specialConditions"
          value={formData.specialConditions}
          onChange={handleChange}
          rows="4"
        />
      </div>
      <button type="submit">Update Availability</button>
    </form>
  );
};

export default VehicleAvailabilityForm;
