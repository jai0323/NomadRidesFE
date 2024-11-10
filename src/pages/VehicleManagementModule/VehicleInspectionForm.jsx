import React, { useState } from "react";
import "../../styles/vehicle-inspection.css"

const VehicleInspectionForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    inspectionDate: "",
    inspectorName: "",
    cleanInterior: false,
    noScratches: false,
    fullTank: false,
    otherCondition: false,
    notes: "",
    inspectionImages: [],
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
      inspectionImages: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="inspection-form">
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
        <label>Inspection Date:</label>
        <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Inspector's Name:</label>
        <input
          type="text"
          name="inspectorName"
          value={formData.inspectorName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Condition Checkboxes:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="cleanInterior"
              checked={formData.cleanInterior}
              onChange={handleChange}
            />
            Clean Interior
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="noScratches"
              checked={formData.noScratches}
              onChange={handleChange}
            />
            No Scratches
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="fullTank"
              checked={formData.fullTank}
              onChange={handleChange}
            />
            Full Tank
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="otherCondition"
              checked={formData.otherCondition}
              onChange={handleChange}
            />
            Other Condition (specify in notes)
          </label>
        </div>
      </div>

      <div>
        <label>Notes for Damages or Issues Found:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div>
        <label>Upload Inspection Images:</label>
        <input
          type="file"
          name="inspectionImages"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Submit Inspection</button>
    </form>
  );
};

export default VehicleInspectionForm;
