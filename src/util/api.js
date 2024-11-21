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
        console.log("api log 20:=",err.response.data.error);
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
        console.log("api log 20:=",err.response.data.error);
        return err.response.data;
    }
}


//get vehicle
export async function getVehicle( registration_no, type ) {
    console.log(registration_no,"--", type)
    try {
        const response = await axios.post(`${BACKEND_URL}/getVehicle`, {registration_no:registration_no,  type:type});
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error);
        return err.response.data;
    }
}

//get vehicle
export async function booking( formData ) {
    console.log(formData,"--")
    try {
        const response = await axios.post(`${BACKEND_URL}/booking`, formData);
        return response.data;
    } catch (err) {
        console.log("api log 20:=",err.response.data.error);
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


//Vendor AD vehicle API
export async function addVehicle(formData, vehicleType) {
    try {
        console.log("API formData:" , formData.photo);
        // for (let [key, value] of data.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        const URL = `${BACKEND_URL}/vehicle/add-${vehicleType.toLowerCase()}`;
        console.log(URL)
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Optional; axios sets this automatically for FormData
            },
        });
        return response.data;
    } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        return err.response?.data || { error: "An error occurred while adding the vehicle." };
    }
}



//Vendor AD vehicle API
export async function updateVehicle(formData, vehicleType) {
    try {
        console.log("API formData:" , formData.photo);
       
        const URL = `${BACKEND_URL}/vehicle/update-${vehicleType.toLowerCase()}`;
        console.log(URL)
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Optional; axios sets this automatically for FormData
            },
        });
        return response.data;
    } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        return err.response?.data || { error: "An error occurred while adding the vehicle." };
    }
}

//Vendor get list of Vehicle
export async function vehicleList(vendor_id) {
    console.log(vendor_id);
    try {
        const response = await axios.post(`${BACKEND_URL}/vehicle_list`, { vendor_id: vendor_id });
        return response.data;
    } catch (err) {
        console.log(err);
        console.log("api log 20:=", err.response ? err.response.data.error : err.message);
        return err.response ? err.response.data : { error: 'Unknown error' };
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