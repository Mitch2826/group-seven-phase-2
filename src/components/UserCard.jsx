import { Link } from 'react-router-dom';

// Receives a user object as a prop and displays username, name, and email
// Also receives an onEdit prop for editing functionality
function UserCard({ user, onEdit }) {
  // Safely handle missing name object
  const firstname = user.name?.firstname || '';
  const lastname = user.name?.lastname || '';
  return (
    <div className="user-card">
      {/* Display the username as a link to the detail page */}
      <h3>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
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
