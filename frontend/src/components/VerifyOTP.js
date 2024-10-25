import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const email = localStorage.getItem('registeredEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/verify-otp', {
        email,
        otp
      });
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Verify OTP</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="email-display">Email: {email}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;