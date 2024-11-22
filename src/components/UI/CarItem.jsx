import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { Buffer } from 'buffer';


const CarItem = ({vehicle}) => {
  console.log(vehicle.registration_no);
  // const { imgUrl, model, carName, automatic, speed, amount,photo } = vehicle;
  const bufferData = new Uint8Array(vehicle.photo?.data);
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={`data:image/png;base64,${Buffer.from(bufferData).toString('base64')}`} alt="" className="mx-auto h-48" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{vehicle.name}</h4>
          <h6 className="rent__price text-center mt-">
          ₹{vehicle.amount}.00 <span>/ Day</span>
          </h6>
          <div className={`${vehicle?.status=='available'?'text-green-500':'text-red-600'} font-medium text-center`}>{vehicle.status.toUpperCase()}</div>
          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {(vehicle.brand +"  " + vehicle.model).slice(0,20)}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {vehicle.fuel_type}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {vehicle.type}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${vehicle.registration_no}`}>Rent
            </Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${vehicle.registration_no}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
