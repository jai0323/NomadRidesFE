import React, { useEffect, useState } from 'react';
import '../styles/adminpage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { kyc_list, kyc_status_update, vehicleList } from '../util/api';  // Assuming kyc_list is a function to fetch KYC data

const AdminPage = () => {

  const navigate = useNavigate();
  const [carList, setCarList] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const [vendorKYCList, setVendorKYCList] = useState([]);
  const [customerKYCList, setCustomerKYCList] = useState([]);
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
    const response = await kyc_list();

    // Assuming the API response has customerPendingKyc and vendorPendingKyc
    setVendorKYCList(response?.VendorPendingKyc || []);
    setCustomerKYCList(response?.customerPendingKyc || []);

    const response1 = await vehicleList();
    setBikeList(response1?.listofbike || []);
    setCarList(response1?.listofcar || []);
  };

  useEffect(() => {
    
    const user =localStorage.getItem('user');
    console.log(user)
    if(user?.email!='admin@gmail.com' || !user)
    {
      // navigate('/login');
    }


    fetchData();
  }, []);  // Empty dependency array ensures it runs only once


  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Dashboard</h1>

      {/* Customer KYC Section */}
      <div className="section">
        <h2 className='font-semibold'>Customer KYC</h2>
        <ul >
          {customerKYCList?.map((customer) => (
            <li key={customer.id} className="list-item">
              <div className="item-info">{customer.name}</div>
              <button onClick={() => handleViewCustomerDetails(customer)}>
                {selectedCustomer?.id === customer.id ? "Hide Details" : "View Details"}
              </button>

              {/* Show details for the selected customer */}
              {selectedCustomer?.id === customer.id && (
                <div className="flex flex-col details">
                  <div className="detail-item">Name: {customer.name}</div>
                  <div className="detail-item">Email: {customer.email}</div>
                  <div className="detail-item">Phone: {customer.phone}</div>
                  <div className="detail-item">Aadhaar: {customer.aadhaar}</div>
                  <div className="detail-item">License: {customer.license}</div>
                  <div className="detail-item">KYC Status: {customer.kyc_status}</div>
                  <div className='flex flex-grow justify-between'>
                    <button onClick={()=>handleApproveKYC('customer',customer.id,'approved')} className='text-sm bg-green-700 hover:bg-green-900 rounded-md'>Approve</button>
                    <button onClick={()=>handleApproveKYC('customer',customer.id,'rejected')} className='text-sm bg-red-700 hover:bg-red-900 rounded-md'>Reject</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className='mb-5 py-1 rounded-full bg-slate-900'/>
      {/* Vendor KYC Section */}
      <div className="section">
        <h2 className='font-semibold'>Vendor KYC</h2>
        <ul>
          {vendorKYCList?.map((vendor) => (
            <li key={vendor.id} className="list-item">
              <div className="item-info">{vendor.name}</div>
              <button onClick={() => handleViewVendorDetails(vendor)}>
                {selectedVendor?.id === vendor.id ? "Hide Details" : "View Details"}
              </button>

              {/* Show details for the selected vendor */}
              {selectedVendor?.id === vendor.id && (
                <div className="flex flex-col details">
                  <div className="detail-item">Name: {vendor.name}</div>
                  <div className="detail-item">Email: {vendor.email}</div>
                  <div className="detail-item">Phone: {vendor.phone}</div>
                  <div className="detail-item">Aadhaar: {vendor.aadhaar}</div>
                  <div className="detail-item">PAN: {vendor.pan}</div>
                  <div className="detail-item">Address: {vendor.address +","+ vendor.city}</div>
                  <div className="detail-item">KYC Status: {vendor.kyc_status}</div>
                  <div className='flex flex-grow justify-between'>
                    <button onClick={()=>handleApproveKYC('vendor',vendor.id,'approved')} className='text-sm bg-green-700 hover:bg-green-900 rounded-md'>Approve</button>
                    <button onClick={()=>handleApproveKYC('vendor',vendor.id,'rejected')} className='text-sm bg-red-700 hover:bg-red-900 rounded-md'>Reject</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className='mb-5 py-1 rounded-full bg-slate-900'/>
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
      <div className="section relative">
      <h2 className='font-semibold sticky'>List of Cars</h2>
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
      {/* Discounts Section */}
      <div className="section set-discount">
        <h2>Discounts</h2>
        <button onClick={() => console.log("Set Discount")}>Set Discount</button>
      </div>
    </div>
  );
};

export default AdminPage;
