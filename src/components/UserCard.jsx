import { Link } from 'react-router-dom';

function UserCard({ user, onEdit, onDelete }) {
  const firstname = user.name?.firstname || '';
  const lastname = user.name?.lastname || '';
  return (
    <div className="user-card">
      <h3>
        {user.id !== undefined && user.id !== null ? (
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        ) : (
          <span>{user.username}</span>
        )}
      </h3>
      <p><strong>Name:</strong> {firstname} {lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {onEdit && (
        <button onClick={onEdit}>Edit</button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(user.id)} style={{ marginLeft: 8, background: '#FF6B6B' }}>
          Delete
        </button>
      )}
    </div>
  );
}

export default UserCard;
