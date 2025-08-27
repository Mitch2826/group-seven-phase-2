import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import axios from 'axios';

function UserDetail() {
  // Get the user ID from the URL
  const { id } = useParams();
  // Get users from Zustand store
  const { users } = useUserStore();
  // Local state for the user
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to find the user in the store
    const found = users.find((u) => u.id === parseInt(id));
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

  return (
    <div>
      <h2>{user.username}</h2>
      <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default UserDetail;