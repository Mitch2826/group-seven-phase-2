// UserCard.js - Displays a single user's info in a card
// Receives a user object and an onEdit handler as props
import { Link } from 'react-router-dom';

function UserCard({ user, onEdit }) {
  // Safely handle missing name object
  const firstname = user.name?.firstname || '';
  const lastname = user.name?.lastname || '';
  return (
    <div className="user-card">
      {/* Display the username as a link to the detail page only if id is defined */}
      <h3>
        {user.id !== undefined && user.id !== null ? (
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        ) : (
          <span>{user.username}</span>
        )}
      </h3>
      {/* Display the user's full name */}
      <p><strong>Name:</strong> {firstname} {lastname}</p>
      {/* Display the user's email */}
      <p><strong>Email:</strong> {user.email}</p>
      {/* Edit button, shown if onEdit is provided */}
      {onEdit && (
        <button onClick={onEdit}>Edit</button>
      )}
    </div>
  );
}

export default UserCard;
