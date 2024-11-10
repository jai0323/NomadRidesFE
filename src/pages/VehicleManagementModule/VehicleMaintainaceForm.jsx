import React, { useState } from "react";
import "../../styles/vehicle-maintenance.css"

const VehicleMaintenanceForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    maintenanceDate: "",
    maintenanceType: "",
    mechanic: "",
    cost: "",
    notes: "",
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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="maintenance-form">
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
        <label>Date of Maintenance:</label>
        <input
          type="date"
          name="maintenanceDate"
          value={formData.maintenanceDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Maintenance Type:</label>
        <select
          name="maintenanceType"
          value={formData.maintenanceType}
          onChange={handleChange}
          required
        >
          <option value="">Select Maintenance Type</option>
          <option value="Oil Change">Oil Change</option>
          <option value="Brake Check">Brake Check</option>
          <option value="Tire Rotation">Tire Rotation</option>
          <option value="Engine Tune-Up">Engine Tune-Up</option>
          <option value="Fluid Check">Fluid Check</option>
          <option value="Battery Check">Battery Check</option>
          <option value="Transmission Service">Transmission Service</option>
        </select>
      </div>

      <div>
        <label>Mechanic/Service Provider:</label>
        <input
          type="text"
          name="mechanic"
          value={formData.mechanic}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Cost of Maintenance:</label>
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Notes/Remarks:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <button type="submit">Submit Maintenance Record</button>
    </form>
  );
};

export default VehicleMaintenanceForm;
