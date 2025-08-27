// UserList.js - Fetches users from the store and renders a list of UserCard components
import { useEffect } from 'react';
import useUserStore from '../store/userStore';
import UserCard from './UserCard';

function UserList() {
  // Get users, loading state, and fetchUsers action from the Zustand store
  const { users, loading, fetchUsers } = useUserStore();

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Show loading message while fetching
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User List</h2>
      <div className="user-list">
        {/* Map through users and render a UserCard for each */}
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
