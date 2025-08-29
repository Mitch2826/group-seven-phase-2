import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      set({ users: response.data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch users.' });
    }
  },

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('https://fakestoreapi.com/users', userData);
      const newUser = {
        ...response.data,
        id: response.data.id || response.data._id,
        email: userData.email,
        username: userData.username,
        name: userData.name,
      };
      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to create user.' });
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`https://fakestoreapi.com/users/${id}`, userData);
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
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to update user.' });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`https://fakestoreapi.com/users/${id}`);
      set((state) => ({
        users: state.users.filter(u => String(u.id) !== String(id)),
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to delete user.' });
    }
  },
}));

export default useUserStore;