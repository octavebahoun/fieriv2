import client from './client';

export const login = async (credentials: any) => {
  const response = await client.post('/auth/login', credentials);
  return response.data; // expecting { token, member } or similar structure
};

export const register = async (userData: any) => {
  const response = await client.post('/auth/register', userData);
  return response.data;
};

export const fetchMe = async () => {
  const response = await client.get('/members/me');
  return response.data; // expecting the logged-in member info
};
