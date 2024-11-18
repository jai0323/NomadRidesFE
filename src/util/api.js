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
        console.log("API formData:" , formData.registration_no);
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

//Vendor get list of Vehicle
export async function vehicleList(vendor_id) {
    console.log(vendor_id);
    try {
        const response = await axios.post(`${BACKEND_URL}/vehicle_list`, { vendor_id: vendor_id });

        const listofbike = await Promise.all(response.data.listofbike.map(async (vehicle) => {
            if (vehicle.photo) {
                const photoBase64 = await convertToBase64(vehicle.photo.data);
                console.log(photoBase64); 
                return { ...vehicle, photo: photoBase64 };
            }
            return vehicle;
        }));

        const listofcar = await Promise.all(response.data.listofcar.map(async (vehicle) => {
            if (vehicle.photo) {
                const photoBase64 = await convertToBase64(vehicle.photo.data);
                return { ...vehicle, photo: photoBase64 };
            }
            return vehicle;
        }));

        response.data.listofbike = listofbike;
        response.data.listofcar = listofcar;

        return response.data;
    } catch (err) {
        console.log(err);
        console.log("api log 20:=", err.response ? err.response.data.error : err.message);
        return err.response ? err.response.data : { error: 'Unknown error' };
    }
}

// Helper function to convert binary data to Base64 using FileReader API
function convertToBase64(binaryData) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const blob = new Blob([binaryData], { type: 'image/png' }); // Adjust the type based on your image type
        
        reader.onloadend = () => {
            resolve(reader.result);
        };
        
        reader.onerror = () => {
            reject('Error converting to base64');
        };

        reader.readAsDataURL(blob);  // This converts the Blob to Base64
    });
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