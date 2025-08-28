// Import the create function from Zustand and axios for API requests
import { create } from 'zustand';
import axios from 'axios';

// Zustand store for user state and actions
const useUserStore = create((set) => ({
  users: [],
  loading: false,

  // Fetch all users from API
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  // Create a new user (POST)
  createUser: async (userData) => {
    set({ loading: true });
    try {
      const response = await axios.post('https://fakestoreapi.com/users', userData);
      // Ensure the new user has the same structure as fetched users
      const newUser = {
        ...response.data,
        email: userData.email,
        username: userData.username,
        name: userData.name,
      };
      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },

  // Update an existing user (PUT)
  updateUser: async (id, userData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`https://fakestoreapi.com/users/${id}`, userData);
      set((state) => ({
        users: state.users.map(u => u.id === id ? response.data : u),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useUserStore;