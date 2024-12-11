import { apiClient } from ".";

// Function to extract response body
const responseBody = (response) => response.data;

// Function to handle errors
const handleError = (method, error) => {
  console.error(`${method} request failed:`, error);
  throw error;
};

// Create reusable API methods for HTTP requests
const requests = {
  async get(url) {
    try {
      const response = await apiClient.get(url);
      return responseBody(response);
    } catch (error) {
      handleError('GET', error);
    }
  },

  async post(url, body) {
    try {
      const response = await apiClient.post(url, body);
      return responseBody(response);
    } catch (error) {
      handleError('POST', error);
    }
  },

  async put(url, body) {
    try {
      const response = await apiClient.put(url, body);
      return responseBody(response);
    } catch (error) {
      handleError('PUT', error);
    }
  },

  async patch(url, body) {
    try {
      const response = await apiClient.patch(url, body);
      return responseBody(response);
    } catch (error) {
      handleError('PATCH', error);
    }
  },

  async delete(url) {
    try {
      const response = await apiClient.delete(url);
      return responseBody(response);
    } catch (error) {
      handleError('DELETE', error);
    }
  },
};

export default requests;
