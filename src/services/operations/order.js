import { toast } from 'react-toastify';
import { apiconnector } from '../apiconnector';
import { orderEndpoints } from '../api';
import axios from 'axios';
const { BUY_NOW } = orderEndpoints;

export const buy = async (orderData, token) => {
  const toastId = toast.loading('Placing Order...');
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.post(BUY_NOW, orderData, { headers });

    console.log('buy res:', response);
    if (response?.data?.success) {
      toast.success('Product ordered successfully');
      return response.data;
    } else {
      throw new Error('Failed to order product');
    }
  } catch (error) {
    toast.error('Failed to order product');
    console.error('ORDER PRODUCT ERROR:', error);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
