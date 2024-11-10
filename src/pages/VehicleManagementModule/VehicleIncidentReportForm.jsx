import React, { useState } from "react";
import '../../styles/vehicle-incident.css'

const VehicleIncidentReportForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    incidentDate: "",
    incidentType: "Accident",
    damageDescription: "",
    policeReportNumber: "",
    incidentPhotos: [],
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      incidentPhotos: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <div className="incident-report-container">
      <form onSubmit={handleSubmit} className="incident-report-form">
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
          <label>Incident Date:</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Incident Type:</label>
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            required
          >
            <option value="Accident">Accident</option>
            <option value="Theft">Theft</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Damage Description:</label>
          <textarea
            name="damageDescription"
            value={formData.damageDescription}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div>
          <label>Police Report Number (if applicable):</label>
          <input
            type="text"
            name="policeReportNumber"
            value={formData.policeReportNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload Incident Photos:</label>
          <input
            type="file"
            name="incidentPhotos"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit Incident Report</button>
      </form>
    </div>
  );
};

export default VehicleIncidentReportForm;
