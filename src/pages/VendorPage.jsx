import React, { useEffect, useState } from 'react';
import '../styles/adminpage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { kyc_list, kyc_status_update, vehicleList } from '../util/api';  // Assuming kyc_list is a function to fetch KYC data

const VendorPage = () => {

  const navigate = useNavigate();
  const [carList, setCarList] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Separate state for customer details
  const [selectedVendor, setSelectedVendor] = useState(null); // Separate state for vendor details
  

  
  // Function to handle viewing details for a customer
  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer.id === selectedCustomer?.id ? null : customer);
  };

  // Function to handle viewing details for a vendor
  const handleViewVendorDetails = (vendor) => {
    setSelectedVendor(vendor.id === selectedVendor?.id ? null : vendor);
  };


  const handleApproveKYC = async(user_type, id, status) => {
    
   console.log(status,"----",user_type,"---",id)
   const kyc_status = await kyc_status_update(user_type,id,status);
   alert(kyc_status.message);

   fetchData();

  };

  const fetchData = async () => {
    const vendor = JSON.parse(localStorage.getItem("user"));
    const response = await vehicleList(vendor.id);
    console.log(response.listofbike)
    // Assuming the API response has customerPendingKyc and vendorPendingKyc
    setBikeList(response?.listofbike || []);
    setCarList(response?.listofcar || []);
  };

  useEffect(() => {
    
    // const user =localStorage.getItem('user');
    // if(user?.email!='admin@gmail.com' || !user)
    // {
    //   navigate('/login');
    // }


    fetchData();
  }, []);  // Empty dependency array ensures it runs only once


  return (
    <div className="admin-container">
        <div className='flex justify-between items-center mt-2 mb-5' >
            <h1 className="admin-header font-bold">Vendor Dashboard</h1>
            <div onClick={()=>{ navigate('/vrf')}} className='p-3  rounded-full w-40 bg-[#ff7519] text-center font-semibold text-white hover:bg-orange-600'>Add Vehicle</div>
        </div>

      {/* Customer KYC Section */}
      <div className="section">
        <h2 className='font-semibold'>List of Bikes</h2>
        <ul>
        {bikeList?.map((bike) => (
            <li key={bike.id} className="flex justify-between items-center bg-[#f9f9f9] my-2 p-3 shadow-lg rounded-lg text-lg">
              <div className="w-1/4">{bike.registration_no}</div>
              <div className="w-1/4">{bike.brand}</div>
              <div className="w-1/4">{bike.model}</div>
              <button className='rounded-full ' onClick={() => navigate('/vmf', { state: { vehicle:bike, type:'Bike' } })}>
                 View Details
              </button>

            </li>
          ))}
        </ul>
      </div>
      <hr className='mb-5 py-1 rounded-full bg-slate-900'/>
      {/* Vendor KYC Section */}
      <div className="section">
      <h2 className='font-semibold'>List of Cars</h2>
        <ul>
        {carList?.map((car) => (
            <li key={car.id} className="flex justify-between items-center bg-[#f9f9f9] my-2 p-3 shadow-lg rounded-lg text-lg">
              <div className="w-1/4">{car.registration_no}</div>
              <div className="w-1/4">{car.brand}</div>
              <div className="w-1/4">{car.model}</div>
              <button className='rounded-full ' onClick={() => navigate('/vmf', { state: { vehicle:car, type:'Car' } })}>
                 View Details
              </button>

            </li>
          ))}
        </ul>
      </div>
      <hr className='mb-5 py-1 rounded-full bg-slate-900'/>

    </div>
  );
};

export default VendorPage;
