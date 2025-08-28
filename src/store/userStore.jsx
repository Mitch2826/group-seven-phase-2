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
      // Ensure the new user has the same structure as fetched users and a valid id
      const newUser = {
        ...response.data,
        id: response.data.id || response.data._id, // fallback if API returns _id
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
      // Merge updated fields for consistency and ensure id is present
      const updatedUser = {
        ...response.data,
        id: response.data.id || id,
        email: userData.email,
        username: userData.username,
        name: userData.name,
      };
      set((state) => ({
        users: state.users.map(u => String(u.id) === String(id) ? updatedUser : u),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useUserStore;