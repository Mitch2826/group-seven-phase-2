import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import UserCard from './UserCard';
import UserForm from './UserForm';

function UserList() {
  const { users, loading, fetchUsers, updateUser, createUser, deleteUser, error } = useUserStore();
  const [editingUser, setEditingUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User List</h2>
      {error && <div style={{ color: '#FF6B6B', textAlign: 'center', marginBottom: '1em' }}>{error}</div>}
      <button className="fab" title="Add User" onClick={() => setCreatingUser(true)}>
        +
      </button>
      <div className="user-list">
        {users.map((user, idx) => {
          const key = user.id !== undefined && user.id !== null ? `${user.id}-${idx}` : `user-${idx}`;
          return (
            <UserCard
              key={key}
              user={user}
              onEdit={() => setEditingUser(user)}
              onDelete={deleteUser}
            />
          );
        })}
      </div>
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
      {editingUser && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <UserForm
              user={editingUser}
              onSubmit={async data => {
                if (editingUser.id !== undefined && editingUser.id !== null) {
                  await updateUser(editingUser.id, data);
                }
                setEditingUser(null);
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
