// UserDetail.js - Shows details for a single user, fetched from store or API
// Uses react-router-dom to get the user ID from the URL
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import axios from 'axios';

function UserDetail() {
  const { id } = useParams(); // Get user ID from URL
  const { users } = useUserStore(); // Get users from Zustand store
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Only proceed if id is defined and a valid number
    if (!id || isNaN(Number(id))) {
      setUser(null);
      return;
    }
    // Try to find the user in the store (compare as string for robustness)
    const found = users.find((u) => String(u.id) === String(id));
    if (found) {
      setUser(found);
    } else {
      // If not found, fetch from API
      axios.get(`https://fakestoreapi.com/users/${id}`)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [id, users]);

  if (!user) return <div>Loading or user not found...</div>;

  // Safely handle missing name object
  const firstname = user.name?.firstname || '';
  const lastname = user.name?.lastname || '';

  return (
    <div>
      <h2>{user.username}</h2>
      <p><strong>Name:</strong> {firstname} {lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default UserDetail;