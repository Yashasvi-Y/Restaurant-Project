import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Auth APIs ====================
export const authAPI = {
  sendOTP: (email) => apiClient.post('/auth/send-otp', { email }),
  
  verifyOTPAndRegister: (email, otp, name, password, confirmPassword) =>
    apiClient.post('/auth/verify-otp', {
      email,
      otp,
      name,
      password,
      confirmPassword
    }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// ==================== Menu APIs ====================
export const menuAPI = {
  getAllItems: (filters = {}) => apiClient.get('/menu', { params: filters }),
  
  getMenuById: (id) => apiClient.get(`/menu/${id}`),
  
  getFilterOptions: () => apiClient.get('/menu/filters'),
  
  createMenuItem: (data) => apiClient.post('/menu', data),
  
  updateMenuItem: (id, data) => apiClient.put(`/menu/${id}`, data),
  
  deleteMenuItem: (id) => apiClient.delete(`/menu/${id}`)
};

// ==================== Staff APIs ====================
export const staffAPI = {
  getAllStaff: () => apiClient.get('/staff'),
  
  getStaffById: (id) => apiClient.get(`/staff/${id}`),
  
  createStaffMember: (data) => apiClient.post('/staff', data),
  
  updateStaffMember: (id, data) => apiClient.put(`/staff/${id}`, data),
  
  deleteStaffMember: (id) => apiClient.delete(`/staff/${id}`)
};

// ==================== Reviews APIs ====================
export const reviewAPI = {
  getApprovedReviews: () => apiClient.get('/reviews'),
  
  getReviewsForMenuItem: (menuItemId) =>
    apiClient.get(`/reviews/menu-item/${menuItemId}`),
  
  submitReview: (data) => apiClient.post('/reviews', data),
  
  getPendingReviews: () => apiClient.get('/reviews/admin/pending'),
  
  approveReview: (id) => apiClient.put(`/reviews/${id}/approve`),
  
  rejectReview: (id) => apiClient.delete(`/reviews/${id}/reject`),
  
  likeReview: (id) => apiClient.post(`/reviews/${id}/like`)
};

// ==================== Bookings APIs ====================
export const bookingAPI = {
  createBooking: (data) => apiClient.post('/bookings', data),
  
  getUserBookings: () => apiClient.get('/bookings'),
  
  getBookingByConfirmation: (confirmationNumber) =>
    apiClient.get(`/bookings/confirmation/${confirmationNumber}`),
  
  getAllBookings: (filters = {}) =>
    apiClient.get('/bookings/admin/all', { params: filters }),
  
  updateBookingStatus: (id, status) =>
    apiClient.put(`/bookings/${id}/status`, { status }),
  
  cancelBooking: (id) => apiClient.delete(`/bookings/${id}`)
};

export default apiClient;
