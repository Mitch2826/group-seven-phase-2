// UserForm.js - Reusable form for both creating and editing users
// Uses props to determine mode and handle submission
import { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onCancel, loading }) {
  // If user exists, prefill fields (edit mode), else empty (create mode)
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  // When user prop changes, update form fields (for edit mode)
  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || '',
        username: user.username || '',
        password: '', // Never prefill password
        firstname: user.name?.firstname || '',
        lastname: user.name?.lastname || '',
      });
    } else {
      setForm({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
      });
    }
  }, [user]);

  // Handle input changes
  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Compose data for API (fakestoreapi expects name as object)
    const data = {
      email: form.email,
      username: form.username,
      password: form.password,
      name: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
    };
    onSubmit(data);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>{user ? 'Edit User' : 'Create User'}</h3>
      <div className="form-group">
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" required />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required={!user}
          placeholder={user ? 'Leave blank to keep current' : ''}
        />
      </div>
      <div className="form-group">
        <label>First Name</label>
        <input name="firstname" value={form.firstname} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input name="lastname" value={form.lastname} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading}>{user ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default UserForm;