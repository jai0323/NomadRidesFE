import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = () => {
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
