/**
 * API Configuration
 * Uses environment variable REACT_APP_API_URL
 * Falls back to localhost:5001 for local development
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Generic API call wrapper
 * @param {string} endpoint - API endpoint (e.g., '/menu', '/bookings')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Fetch response
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Merge default headers with provided headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add authorization token if it exists
  const token = localStorage.getItem('authToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers
  });
};

/**
 * GET request helper
 */
export const apiGet = (endpoint, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'GET'
  });
};

/**
 * POST request helper
 */
export const apiPost = (endpoint, body, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
};

/**
 * PUT request helper
 */
export const apiPut = (endpoint, body, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body)
  });
};

/**
 * DELETE request helper
 */
export const apiDelete = (endpoint, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'DELETE'
  });
};

// Export for debugging
export { API_URL };
