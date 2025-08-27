import { Link } from 'react-router-dom';

// Receives a user object as a prop and displays username, name, and email
function UserCard({ user }) {
  return (
    <div className="user-card">
      {/* Display the username */}
      <h3>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </h3>
      {/* Display the user's full name */}
      <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
      {/* Display the user's email */}
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default UserCard;
