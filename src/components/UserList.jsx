// UserList.js - Fetches users from the store and renders a list of UserCard components

import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import UserCard from './UserCard';
import UserForm from './UserForm';

function UserList() {
  // Get users, loading state, and actions from the Zustand store
  const { users, loading, fetchUsers, updateUser, createUser } = useUserStore();
  // State to track which user is being edited
  const [editingUser, setEditingUser] = useState(null);
  // State to control create user modal
  const [creatingUser, setCreatingUser] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Show loading message while fetching
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User List</h2>
      {/* Add User Button */}
      <button className="fab" title="Add User" onClick={() => setCreatingUser(true)}>
        +
      </button>
      <div className="user-list">
        {/* Map through users and render a UserCard for each */}
        {users.map((user, idx) => {
          // Always use a unique key: combine id and idx to avoid duplicates
          const key = user.id !== undefined && user.id !== null ? `${user.id}-${idx}` : `user-${idx}`;
          return (
            <UserCard
              key={key}
              user={user}
              onEdit={() => setEditingUser(user)} // Pass handler to open edit form
            />
          );
        })}
      </div>

      {/* Show UserForm for creating in a modal */}
      {creatingUser && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <UserForm
              user={null}
              onSubmit={async data => {
                await createUser(data);
                setCreatingUser(false);
              }}
              onCancel={() => setCreatingUser(false)}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Show UserForm for editing in a modal */}
      {editingUser && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <UserForm
              user={editingUser}
              onSubmit={async data => {
                // Prevent update if id is missing (avoids 400 error)
                if (editingUser.id !== undefined && editingUser.id !== null) {
                  await updateUser(editingUser.id, data); // Call update action
                }
                setEditingUser(null); // Close form after update
              }}
              onCancel={() => setEditingUser(null)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
