import React ,{useState}from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

const FindCarForm = () => {
  const [vehicleType, setVehicleType] = useState('car');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleVehicleChange = (e) => {
    setVehicleType(e.target.value);
  };

  const onSubmit =  (e) => {
    e.preventDefault()
    console.log(from)
    console.log(to)
    console.log(vehicleType)
  }

  return (
    <Form onSubmit={onSubmit} className="form" >
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <label htmlFor="">Form</label>
          <input 
            type="date" 
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            required 
          />
        </FormGroup>
        <FormGroup className="form__group">
        <label htmlFor="">To</label>
          <input 
            type="date" 
            value={to}
            onChange={(e)=>setTo(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup className="select__group">
        <label htmlFor="">Vehicle type</label>
          <select onChange={handleVehicleChange} value={vehicleType}>
            <option value="bike">Bike</option>
            <option value="car"> Car</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <Link to={`/${vehicleType}s`} type="submit" className="btn find__car-btn">
            {vehicleType === 'car' ? 'Find Car' : 'Find Bike'}</Link>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
