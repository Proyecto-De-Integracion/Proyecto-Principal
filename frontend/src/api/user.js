import axios from 'axios';

const API_URL = 'http://localhost:4000';


export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data;
};


export const logoutUser = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};


export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/session`, { withCredentials: true });
    return response.data;
};
