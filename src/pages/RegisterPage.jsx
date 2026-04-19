import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP + Password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await authAPI.sendOTP(formData.email);
      setSuccess('OTP sent to your email! Check your inbox.');
      setStep(2);
      setOtpTimer(600); // 10 minutes timer

      // Countdown timer
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Register
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.otp || !formData.name || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTPAndRegister(
        formData.email,
        formData.otp,
        formData.name,
        formData.password,
        formData.confirmPassword
      );

      // Save token and user info
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
          <h1>Create Your Account</h1>
          <p className="subtitle">Join our restaurant community</p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {step === 1 ? (
            // Step 1: Email Entry
            <form onSubmit={handleSendOTP}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <p className="form-footer">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          ) : (
            // Step 2: OTP + Password Entry
            <form onSubmit={handleVerifyAndRegister}>
              <div className="form-group">
                <label htmlFor="otp">Verification Code</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                />
                {otpTimer > 0 && (
                  <small className="timer">OTP expires in: {formatTimer(otpTimer)}</small>
                )}
                {otpTimer === 0 && (
                  <small className="timer-expired">OTP expired. <button type="button" onClick={() => { setStep(1); setError(''); }}>Send new OTP</button></small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading || otpTimer === 0}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
              >
                Back to Email
              </button>
            </form>
          )}
        </div>

        <div className="register-info">
          <h2>Why Register?</h2>
          <ul>
            <li>✓ Reserve tables instantly</li>
            <li>✓ Save your preferences</li>
            <li>✓ Booking history & confirmations</li>
            <li>✓ Special offers & early access</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
