import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = ({vendor, registration_no}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // console.log(registration_no)

  const [formData, setFormData] = useState({
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1],
    email: user.email,
    phone:user.phone,
    from_date: "",
    to_date: "",
    insurance:"",
    // vendor_id:vendor.id,
    // vehicle_id:registration_no,
    customer_id:user.id,
    amount:""
  });

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="First Name" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Last Name" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" placeholder="Phone Number" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Journey Start Date" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="date" placeholder="Journey End Date" />
      </FormGroup>
      <FormGroup className=" flex gap-4 text-[#5e5d5d]">
      <label>
        <input type="radio" name="insurance" value="199" /> Insurance at ₹99
      </label>
      <label>
        <input type="radio" name="insurance" value="299" /> Insurance at ₹199
      </label>
    </FormGroup>
    <FormGroup className="flex flex-col gap-4 border border-[#c2c1c1] p-4">
      <div className="flex w-full justify-between">
        <label>Discount 10%</label>
        <label>- ₹99</label>
      </div>
      <div className="flex w-full justify-between">
        <label>Insurance</label>
        <label>₹99</label>
      </div>
      <div className="flex w-full justify-between border-t pt-3">
        <label>Amount</label>
        <label>₹1999</label>
      </div>
    </FormGroup>
    </Form>
  );
};

export default BookingForm;
