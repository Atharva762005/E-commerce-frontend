import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Hardcoded for local dev, should use env vars in production
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
