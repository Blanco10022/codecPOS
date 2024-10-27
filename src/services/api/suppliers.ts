import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const fetchSuppliers = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/suppliers/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export const createSupplier = async (token: string, supplierData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/suppliers/create/`, supplierData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

export const updateSupplier = async (token: string, supplierId: string, supplierData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/suppliers/${supplierId}/update/`, supplierData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

export const deleteSupplier = async (token: string, supplierId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/suppliers/${supplierId}/delete/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};