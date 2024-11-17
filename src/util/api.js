import axios from "axios";

const BACKEND_URL = 'http://localhost:3000';

// signin API
export async function signin( email, password, role ) {
    console.log(email,password,role)
    try {
        const response = await axios.post(`${BACKEND_URL}/${role}Login`, {email, password});
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//Signup API
export async function signup( formData ) {
    console.log(formData)
    try {
        const response = await axios.post(`${BACKEND_URL}/customerSignup`, {email:formData.email, password:formData.password, name:formData.fullName, phone:formData.phone});
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error)
        return err.response.data;
    }
}
//complete customer KYC API
export async function kyc( formData, role ) {
    console.log(formData)
    try {
        const response = await axios.put(`${BACKEND_URL}/KYC/${role}`, {aadhaar:formData.aadhaar, license:formData.license.toUpperCase(), id:formData.id});
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error)
        return err.response.data;
    }
}


//----------------------------------------------- VENDOR API's ---------------------------------------------------------

//Vendor Signup API
export async function vendorSignup( formData ) {
    console.log(formData)
    try {
        const response = await axios.post(`${BACKEND_URL}/vendorSignup`, {email:formData.email, password:formData.password, name:formData.fullName, phone:formData.phone, city:formData.city, address:formData.address});
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error)
        return err.response.data;
    }
}




//----------------------------------------------- ADMIN API's ---------------------------------------------------------

//Admin get list of KYC
export async function kyc_list() {
    try {
        const response = await axios.post(`${BACKEND_URL}/kyc_list`);
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error)
        return err.response.data;
    }
}


//Admin approve or reject kyc of vendor or customer
export async function kyc_status_update(user_type,id,status) {
    try {
        
        console.log("API calling",status,"----",user_type,"---",id)
        const response = await axios.post(`${BACKEND_URL}/kyc_approval`,{user_type:user_type,id:id,status:status});
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error)
        return err.response.data;
    }
}