import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { useNavigate } from "react-router-dom";
import { vehicleList } from "../util/api";

const CarListing = () => {
  const navigate = useNavigate();
  const [carList, setCarList] = useState([]);
  const [bikeList, setBikeList] = useState([]);

  const fetchData = async () => {
    const response1 = await vehicleList();
    // setBikeList(response1?.listofbike || []);
    setCarList(response1?.listofcar || []);
    // console.log(response1?.listofbike)
  };
  
  
  useEffect(()=>{
  
    fetchData();
  },[]);
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carList.map((item) => (
              <CarItem vehicle={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
