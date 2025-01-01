import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('/api/emails', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmails(data.emails);
      } catch (err) {
        setError('Error fetching emails. Please try again.');
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Email Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc pl-5">
        {emails.map((email, index) => (
          <li key={index} className="mb-2">
            <p><strong>From:</strong> {email.from}</p>
            <p><strong>Subject:</strong> {email.subject}</p>
            <p>{email.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailDashboard;
