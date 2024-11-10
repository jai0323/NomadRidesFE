import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/vehicle-management.css'


const VehicleManagementPage = () => {
  const navigate = useNavigate();

  const handleOpenRegistrationForm = () => {
    navigate("/vrf");
  };

  const handleOpenMaintenanceForm = () => {
    navigate("/vmf");
  };

  const handleOpenAvailibilityForm = () => {
    navigate("/vaf")
  };

  const handleOpenInspectionForm = () => {
   navigate("/vif")
  };

  const handleOpenIncidentForm = () => {
    navigate("/virf");
  };


  return (
    <div className="management-page">
      <h1>Vehicle Management</h1>
      
      <div className="button-container">
        <button className="form-button" onClick={handleOpenRegistrationForm}>
          Vehicle Registration
        </button>
        <button className="form-button" onClick={handleOpenMaintenanceForm}>
          Vehicle Maintenance
        </button>
        <button className="form-button" onClick={handleOpenAvailibilityForm}>
          Vehicle Avilibility
        </button>
        <button className="form-button" onClick={handleOpenInspectionForm}>
          Vehicle Inspection
        </button>
        <button className="form-button" onClick={handleOpenIncidentForm}>
          Apply for Claim
        </button>
      </div>



    </div>
  );
};

export default VehicleManagementPage;
