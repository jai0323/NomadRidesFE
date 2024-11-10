import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import CarListing from '../pages/CarListing'
import CarDetails from '../pages/CarDetails'
import Blog from '../pages/Blog'
import BlogDetails from '../pages/BlogDetails'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'
import BikeListing from '../pages/BikeListing'
import BikeDetails from '../pages/BikeDetails'
import AdminPage from '../pages/AdminPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import VehicleRegistrationPage from '../pages/VehicleManagementModule/VehicleManagementPage'
import VehicleRegistrationForm from '../pages/VehicleManagementModule/VehicleRegistrationForm'
import VehicleMaintenanceForm from '../pages/VehicleManagementModule/VehicleMaintainaceForm'
import VehicleIncidentReportForm from '../pages/VehicleManagementModule/VehicleIncidentReportForm'
import VehicleInspectionForm from '../pages/VehicleManagementModule/VehicleInspectionForm'
import VehicleAvailabilityForm from '../pages/VehicleManagementModule/VehicleAvailabilityForm'
import ProfileUpdatePage from '../pages/ProfileUpdatePage'
const Routers = () => {
  return (
    <Routes>
        <Route path='/' element ={<Navigate to ='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cars' element={<CarListing/>}/>
        <Route path='/cars/:slug' element={<CarDetails/>}/>
        <Route path='/bikes' element={<BikeListing/>}/>
        <Route path='/bikes/:sluge' element={<BikeDetails/>}/>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/blogs/:slug' element={<BlogDetails/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/vrp' element={<VehicleRegistrationPage/>}/>
        <Route path='/vrf' element={<VehicleRegistrationForm/>}/>
        <Route path='/vmf' element={<VehicleMaintenanceForm/>}/>
        <Route path='/virf' element={<VehicleIncidentReportForm/>}/>
        <Route path='/vif' element={<VehicleInspectionForm/>}/>
        <Route path='/vaf' element={<VehicleAvailabilityForm/>}/>
        <Route path='/pup' element={<ProfileUpdatePage/>}/>
        <Route path='*' element={<NotFound/>}/>
        
    </Routes>
  )
}

export default Routers