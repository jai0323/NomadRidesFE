import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BikeItem from "../components/UI/BikeItem";
import bikeData from "../assets/data/bikeData";
import { useNavigate } from "react-router-dom";
import { vehicleList } from "../util/api";

const BikeListing = () => {
  const navigate = useNavigate();
  const [carList, setCarList] = useState([]);
  const [bikeList, setBikeList] = useState([]);

  const fetchData = async () => {
    const response1 = await vehicleList();
    setBikeList(response1?.listofbike || []);
    // setCarList(response1?.listofcar || []);
    // console.log(response1?.listofbike)
  };
  
  
  useEffect(()=>{
  
    fetchData();
  },[]);


  return (
    <Helmet title="Bikes">
      <CommonSection title="Bike Listing" />

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

            {bikeList.map((item) => (
              <BikeItem vehicle={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeListing;
