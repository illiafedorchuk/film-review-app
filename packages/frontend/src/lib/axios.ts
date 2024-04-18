import Axios from "axios";

// Create an Axios instance with common configuration
const axios = Axios.create({
  baseURL: "http://localhost:3000", // Change to your backend's base URL
  withCredentials: true, // Necessary if your backend uses sessions
});

// Request interceptor to handle or modify requests before they are sent
axios.interceptors.request.use(async (config) => {
  // Add or modify headers here, if needed
  // For example, adding a content-type header:
  // config.headers['Content-Type'] = 'application/json';

  // Log the request config before sending it
  console.log("Sending request:", config);

  return config;
});

// Response interceptor for handling responses globally
axios.interceptors.response.use(
  (response) => {
    // Handle a successful response
    console.log("Received successful response:", response);
    return response;
  },
  async (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      console.error("Unauthorized access detected");
      // Optionally, redirect to login or perform other actions
    } else if (error.response && error.response.data) {
      // Log server-provided error details
      console.error("Server Error:", error.response.data);
    } else {
      // Log other errors that might occur
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
