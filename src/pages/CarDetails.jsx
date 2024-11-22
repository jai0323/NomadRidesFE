import React, { useEffect, useState } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { booking, getVehicle } from "../util/api";
import { Buffer } from 'buffer';
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";

const CarDetails = () => {
  const navigate = useNavigate()
  const { registration_no } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [bufferData, setBufferData] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
 

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        console.log("registration_no", registration_no);
        const response = await getVehicle(registration_no, 'car');
        setVehicle(response.vehicle);
        setVendor(response.vendor)
        setFormData((prevState) => ({
          ...prevState,
          vendor_id: response.vendor.id,
        }));
        if (response.vehicle?.photo?.data) {
          const buffer = new Uint8Array(response.vehicle.photo.data);
          setBufferData(Buffer.from(buffer).toString('base64'));
        }

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicle();
    
  }, [registration_no]);

  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0],
    lastName: user?.name.split(' ')[1],
    email: user?.email,
    phone:user?.phone,
    from_date: "",
    to_date: "",
    insurance:"",
    vendor_id:vendor?.id,
    vehicle_id:registration_no,
    customer_id:user?.id,
    amount:"",
    payment_method:"",
    vehicle_type:'car',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    const response = await booking(formData);
    alert(response.message);
    if(response.message=="Booking completed successfully"){
        navigate('/home');
    }

  };
  console.log(formData)

  useEffect(() => {
    const calculateTotalAmount = (formData, perDayRate) => {
      try {
        // Parse the input dates
        const startDate = new Date(formData.from_date);
        const endDate = new Date(formData.to_date);
  
        // Check if dates are valid
        if (isNaN(startDate) || isNaN(endDate)) {
          console.error("Invalid dates provided");
          return;
        }
  
        // Calculate the difference in time (milliseconds)
        const timeDifference = endDate - startDate;
  
        // Calculate the difference in days
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
        // Ensure the day difference is positive
        if (dayDifference <= 0) {
          console.error("End date must be after the start date");
          return;
        }
  
        // Calculate the total amount
        let totalAmount = (dayDifference * perDayRate);
        totalAmount +=+formData.insurance;
        // Update the form data with the calculated amount
        setFormData((prevState) => ({
          ...prevState,
          amount: totalAmount,
        }));
        
      } catch (error) {
        console.error("Error calculating total amount:", error.message);
      }
    };
  
    // Calculate total amount when `from_date` or `to_date` changes
    if (formData.from_date && formData.to_date) {
      calculateTotalAmount(formData, vehicle.amount);
    }
  }, [formData.from_date, formData.to_date, vehicle,formData.insurance]);
 
  return (
    <Helmet title={vehicle?.name || 'Bike Details'}>
      <section>
        <Container>
        <form onSubmit={submitHandler}>
          <Row>
            <Col lg="6">
              <img
                src={bufferData ? `data:image/png;base64,${bufferData}` : '/path/to/default/image.png'}
                alt={vehicle?.name || 'Bike Image'}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{vehicle?.name}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${vehicle?.amount?.toFixed(2)} / Day
                  </h6>

                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({vehicle?.rating || 0} ratings)
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className="d-flex text-xl align-items-center gap-1 section__description">
                    <i className="ri-roadster-line text-xl" style={{ color: "#f9a826" }}></i>{" "}
                    <span className="text-xl text-black">{vehicle?.brand || 'N/A'}</span>
                    <span className="text-xl text-black px-2">{vehicle?.model || 'N/A'}</span>
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-timer-flash-line text-xl" style={{ color: "#f9a826" }}></i>{" "}
                    <span className="text-xl text-black">{vehicle?.fuel_type || 'N/A'}</span>
                  </span>
                </div>
                <p className="flex flex-col my-5 gap-3 text-lg">
                  <span>Vendor Name : {vendor?.name}</span>
                  <span>Address  : {vendor?.name}</span>
                  <span>Phone : +91-{vendor?.phone}</span>
                  <span>Email : {vendor?.email}</span>
                  <span >Vehicle Status : <span className={`${vehicle?.status=='available'?'text-green-500':'text-red-600'} font-semibold`}>{vehicle?.status.toUpperCase()}</span></span>

                </p>

              </div>
            </Col>
            
            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                
                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={onChangeHandler} disabled/>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={onChangeHandler} disabled/>
                      </FormGroup>

                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChangeHandler} disabled/>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={onChangeHandler} disabled/>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="date" name="from_date" placeholder="Journey Start Date" value={formData.from_date} onChange={onChangeHandler} required/>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input type="date" name="to_date" placeholder="Journey End Date" value={formData.to_date} onChange={onChangeHandler} required/>
                      </FormGroup>
                      <FormGroup className=" flex gap-4 text-[#5e5d5d]">
                      <label>
                        <input type="radio" name="insurance" value="0" checked={formData.insurance === "0"} onChange={onChangeHandler} required/> No Insurance 
                      </label>
                      <label>
                        <input type="radio" name="insurance" value="99" checked={formData.insurance === "99"} onChange={onChangeHandler} required/> Insurance at ₹99
                      </label>
                      <label>
                        <input type="radio" name="insurance" value="199" checked={formData.insurance === "199"} onChange={onChangeHandler} required/> Insurance at ₹199
                      </label>
                      </FormGroup>
                      <div className="flex flex-col gap-2 my-2 text-[#5e5d5d]">
                        <div>No Insurance:- No cover in case to damage / stolen or accident</div>
                        <div>₹99 Insurance:- Cover for part damaged T&C apply</div>
                        <div>₹199 Insurance:- Full cover for part damaged/accident or stolen T&C apply</div>
                      </div>
                      <FormGroup className="flex flex-col gap-4 border border-[#c2c1c1] p-4">
                        {/* <div className="flex w-full justify-between">
                          <label>Discount 10%</label>
                          <label>- ₹99</label>
                        </div> */}
                        <div className="flex w-full justify-between">
                          <label>Insurance</label>
                          <label>₹{formData.insurance?formData.insurance:0}</label>
                        </div>
                        <div className="flex w-full justify-between border-t pt-3">
                          <label>Amount</label>
                          <label>₹{formData.amount?formData.amount:0}</label>
                        </div>
                      </FormGroup>
                    
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <>
                  <div className="payment">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                      <input 
                        name="payment_method" 
                        type="radio" 
                        value="NEFT" 
                        checked={formData.payment_method === "NEFT"} 
                        onChange={onChangeHandler} 
                        required
                      /> 
                      Direct Bank Transfer
                    </label>
                  </div>

                  <div className="payment mt-3">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                      <input 
                        name="payment_method" 
                        type="radio" 
                        value="UPI" 
                        checked={formData.payment_method === "UPI"} 
                        onChange={onChangeHandler} 
                        required
                      /> 
                      UPI Payment
                    </label>
                  </div>

                  <div className="payment mt-3 d-flex align-items-center justify-content-between">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                      <input 
                        name="payment_method" 
                        type="radio" 
                        value="masterCard" 
                        checked={formData.payment_method === "masterCard"} 
                        onChange={onChangeHandler} 
                        required
                      /> 
                      Master Card
                    </label>

                    <img src={masterCard} alt="Master Card" />
                  </div>

                  <div className="payment mt-3 d-flex align-items-center justify-content-between">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                      <input 
                        name="payment_method" 
                        type="radio" 
                        value="paypal" 
                        checked={formData.payment_method === "paypal"} 
                        onChange={onChangeHandler} 
                        required
                      /> 
                      Paypal
                    </label>

                    <img src={paypal} alt="Paypal" />
                  </div>
                  
                  <div className="payment text-end mt-5">
                    <button type="submit">Reserve Now</button>
                  </div>
                </>
              </div>
            </Col>

          </Row>
            </form>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
