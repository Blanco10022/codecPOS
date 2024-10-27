import axios from 'axios'

const API_URL = 'https://elegant-crow-curiously.ngrok-free.app/api/v1'

export const fetchCategories = async (token: string) => {
  const response = await axios.get(`${API_URL}/products/categories/`, {
    headers: { Authorization: `Token ${token}` }
  })
  console.log(response.data)
  return response.data
}

export const createCategory = async (formData: FormData, token: string) => {
  const response = await axios.post(`${API_URL}/categories/create/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getCategory = async (categoryId: string, token: string) => {
  const response = await axios.get(`${API_URL}/categories/${categoryId}/`, {
    headers: { Authorization: `Token ${token}` }
  })
  return response.data
}

export const updateCategory = async (categoryId: string, formData: FormData, token: string) => {
  const response = await axios.put(`${API_URL}/categories/${categoryId}/update/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const deleteCategory = async (categoryId: string, token: string) => {
  await axios.delete(`${API_URL}/categories/${categoryId}/delete/`, {
    headers: { Authorization: `Token ${token}` }
  })
}
