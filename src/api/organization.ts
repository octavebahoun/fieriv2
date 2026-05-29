import client from './client';

export const getCountries = async () => {
  const response = await client.get('/countries');
  return response.data;
};

export const getCountry = async (id: number | string) => {
  const response = await client.get(`/countries/${id}`);
  return response.data;
};

export const getUniversitiesOfCountry = async (countryId: number | string) => {
  const response = await client.get(`/countries/${countryId}/universities`);
  return response.data;
};

export const getUniversity = async (id: number | string) => {
  const response = await client.get(`/universities/${id}`);
  return response.data;
};

export const getBranchesOfUniversity = async (universityId: number | string) => {
  const response = await client.get(`/universities/${universityId}/branches`);
  return response.data;
};

export const getBranch = async (id: number | string) => {
  const response = await client.get(`/branches/${id}`);
  return response.data;
};

// Admin/creation endpoints
export const createCountry = async (data: { name: string }) => {
  const response = await client.post('/countries', data);
  return response.data;
};

export const createUniversity = async (data: { name: string; countryId: number }) => {
  const response = await client.post('/universities', data);
  return response.data;
};

export const createBranch = async (data: { name: string; universityId: number }) => {
  const response = await client.post('/branches', data);
  return response.data;
};
