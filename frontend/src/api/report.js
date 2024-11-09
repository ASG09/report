import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const createReport = async (cv, template) => {
  const formData = new FormData();
  formData.append('cv', cv);
  formData.append('template', template);

  try {
    const response = await api.post('/create-report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob'  // Added to allow downloading the file
    });
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
