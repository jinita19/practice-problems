import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Simple API client with two methods: get users and post user
const UserApi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // API base URL - replace with your actual API endpoint
  const API_URL = 'https://jsonplaceholder.typicode.com';
  
  // Method 1: Get users
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      console.log('Users fetched:', response.data);
      return response.data;
    } catch (err) {
      setError('Error fetching users: ' + err.message);
      console.error('Error fetching users:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Method 2: Post new user with comprehensive headers and config
  const createUser = async (userData) => {
    setLoading(true);
    try {
      // Request headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with actual auth token
        'Accept': 'application/json',
        'X-Request-ID': generateRequestId(), // Custom request ID for tracking
        'X-Client-Version': '1.0.0' // Client version for API compatibility
      };
      
      // Request configuration
      const config = {
        headers,
        timeout: 10000, // 10 seconds timeout
        withCredentials: true, // Include cookies in the request
        validateStatus: (status) => status >= 200 && status < 300, // Custom status validation
        maxContentLength: 5000000, // Max response size in bytes
        maxBodyLength: 5000000, // Max request body size in bytes
      };
      
      const response = await axios.post(`${API_URL}/users`, userData, config);
      
      console.log('User created:', response.data);
      console.log('Response headers:', response.headers);
      console.log('Status:', response.status);
      
      // Update users list with the new user
      setUsers(prevUsers => [...prevUsers, response.data]);
      return response.data;
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // The request was made and server responded with non-2xx status
        setError(`Error creating user: Server responded with ${err.response.status}: ${JSON.stringify(err.response.data)}`);
        console.error('Server error response:', err.response.data);
        console.error('Status code:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        // Request was made but no response received
        setError('Error creating user: No response received from server');
        console.error('No response received:', err.request);
      } else {
        // Error setting up request
        setError('Error creating user: ' + err.message);
        console.error('Request setup error:', err.message);
      }
      
      // Log the full error for debugging
      console.error('Complete error object:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
    
  // Example usage - fetch users when component mounts
  useEffect(() => {
    getUsers();
  }, []);
  
  // Example - create a new user
  const handleCreateUser = () => {
    const newUser = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-1234',
      website: 'janedoe.com'
    };
    
    createUser(newUser)
      .then(createdUser => console.log('Successfully created:', createdUser))
      .catch(err => console.error('Failed to create user:', err));
  };
  
  // In a real application, you'd use these values in your UI
  // but per requirements, we're just logging to console
  console.log('Current state:', { users, loading, error });
  
  return (
    <div>
      {/* This component doesn't render any UI elements per requirement */}
      {/* You could add a button like this if needed: */}
      {/* <button onClick={handleCreateUser}>Create Sample User</button> */}
    </div>
  );
};

export default UserApi;

const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };
