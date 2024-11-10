import React ,{useState}from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  const [vehicleType, setVehicleType] = useState('car');

  const handleVehicleChange = (e) => {
    setVehicleType(e.target.value);
  };
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>

        <FormGroup className="select__group">
          <select onChange={handleVehicleChange} value={vehicleType}>
            <option value="car"> Car</option>
            <option value="bike">Bike</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">
            {vehicleType === 'car' ? 'Find Car' : 'Find Bike'}</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
