import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import axios from 'axios';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setUser(null);
      return;
    }
    const found = users.find((u) => String(u.id) === String(id));
    if (found) {
      setUser(found);
    } else {
      axios.get(`https://fakestoreapi.com/users/${id}`)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [id, users]);

  if (!user) return <div>Loading or user not found...</div>;

  const firstname = user.name?.firstname || '';
  const lastname = user.name?.lastname || '';

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1em' }}>
        &larr; Back
      </button>
      <h2>{user.username}</h2>
      <p><strong>Name:</strong> {firstname} {lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default UserDetail;