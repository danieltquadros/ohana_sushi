import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sushi-production-3f30.up.railway.app';

export async function fetchItems() {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens de sushi:', error);
    throw error;
  }
}

export async function getZipCodeService(zipCode: string) {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json`,
    );
    return response?.data;
  } catch (error: any) {
    return error?.response;
  }
}
