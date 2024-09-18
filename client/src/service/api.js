import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Cambia esto a la URL de tu backend
    withCredentials: true,
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/api/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


