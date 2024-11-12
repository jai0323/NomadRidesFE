import axios from "axios";

const BACKEND_URL = 'http://localhost:3000';

export async function signin( email, password, role ) {
    console.log(email,password,role)
    try {
        const response = await axios.post(`${BACKEND_URL}/${role}Login`, {email, password});
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export async function signup( formData ) {
    console.log(formData)
    try {
        const response = await axios.post(`${BACKEND_URL}/customerSignup`, {email:formData.email, password:formData.password, name:formData.fullName, phone:formData.phone});
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}