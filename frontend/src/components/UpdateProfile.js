import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.put(
        '/api/profile',
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError('Error updating profile. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Update</button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
