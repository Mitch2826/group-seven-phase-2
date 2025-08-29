import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <h1>Users</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
