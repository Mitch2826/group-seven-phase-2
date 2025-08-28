import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

// The main App component sets up routing for the app
function App() {
  return (
    <Router>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <h1>Users</h1>
        {/* Define the different routes for the application */}
        <Routes>
          {/* Default route renders the UserList component */}
          <Route path="/" element={<UserList />} />
          {/* UserDetail route displays details for a specific user based on ID */}
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
