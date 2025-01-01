import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPassword from './components/ResetPassword';
import UpdateProfile from './components/UpdateProfile';
import EmailDashboard from './components/EmailDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/dashboard" element={<EmailDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
