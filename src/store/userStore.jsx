// Import the create function from Zustand and axios for API requests
import { create } from 'zustand';
import axios from 'axios';

// Create a Zustand store using the create function
const useUserStore = create((set) => ({
  // Initial state: users array and loading boolean
  users: [],
  loading: false,

  // Action to fetch users from the API
  fetchUsers: async () => {
    set({ loading: true }); // Set loading to true before fetching
    try {
      // Make GET request to the API
      const response = await axios.get('https://fakestoreapi.com/users');
      // Update users with the fetched data and set loading to false
      set({ users: response.data, loading: false });
    } catch (error) {
      // If there's an error, just set loading to false
      set({ loading: false });
      // Optionally, you can handle the error here (e.g., set an error state)
    }
  },
}));

// Export the custom hook to use the store in components
export default useUserStore;