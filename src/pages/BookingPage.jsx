import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Choose party size, Step 2: Date/Time, Step 3: Details
  const [formData, setFormData] = useState({
    partySize: 2,
    date: '',
    time: '',
    name: '',
    email: '',
    kitchenTour: false,
    tableSize: null
  });

  const diiningHours = {
    1: { start: '11:30', end: '21:00' }, // Monday
    2: { start: '11:30', end: '21:00' }, // Tuesday
    3: { start: '11:30', end: '21:00' }, // Wednesday
    4: { start: '11:30', end: '21:00' }, // Thursday
    5: { start: '11:30', end: '22:00' }, // Friday
    6: { start: '11:30', end: '22:00' }, // Saturday
    0: { start: '11:30', end: '21:00' }  // Sunday
  };

  const handlePartySize = (size) => {
    setFormData(prev => ({ ...prev, partySize: size }));
    // Auto-select appropriate table size
    let tableSize = size <= 4 ? 4 : size <= 6 ? 6 : 8;
    setFormData(prev => ({ ...prev, tableSize }));
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateSelect = (e) => {
    setFormData(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const bookingData = {
        guestName: formData.name,
        guestEmail: formData.email,
        numberOfGuests: formData.partySize,
        reservationDate: formData.date,
        reservationTime: formData.time,
        kitchenTour: formData.kitchenTour
      };

      const response = await apiPost('/bookings', bookingData);

      if (response.ok) {
        alert('Booking confirmed! Check your email for details.');
        navigate('/');
      } else {
        const error = await response.json();
        alert('Error: ' + (error.message || 'Failed to create booking'));
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Min date is tomorrow
    return today.toISOString().split('T')[0];
  };

  const getTimeOptions = () => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay();
    const hours = diiningHours[day];
    
    const times = [];
    const [startH, startM] = hours.start.split(':');
    const [endH, endM] = hours.end.split(':');
    
    let currentHour = parseInt(startH);
    let currentMin = parseInt(startM);
    
    while (currentHour < parseInt(endH) || (currentHour === parseInt(endH) && currentMin < parseInt(endM))) {
      times.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`);
      currentMin += 30;
      if (currentMin >= 60) {
        currentMin = 0;
        currentHour += 1;
      }
    }
    
    return times;
  };

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Reserve Your Table</h1>
        
        <div className="booking-form">
          {step === 1 && (
            <div className="booking-step">
              <h2>How many guests?</h2>
              <div className="guest-options">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    className={`guest-btn ${formData.partySize === num ? 'active' : ''}`}
                    onClick={() => handlePartySize(num)}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="booking-step">
              <h2>Select Date & Time</h2>
              <button onClick={() => setStep(1)} className="btn-back">← Back</button>
              
              <form>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleDateSelect}
                    min={getMinDate()}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time:</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select time</option>
                    {getTimeOptions().map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn-primary"
                  disabled={!formData.date || !formData.time}
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="booking-step">
              <h2>Your Details</h2>
              <button onClick={() => setStep(2)} className="btn-back">← Back</button>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="kitchenTour"
                    name="kitchenTour"
                    checked={formData.kitchenTour}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="kitchenTour">
                    I'm interested in a behind-the-scenes kitchen tour
                  </label>
                </div>

                <button type="submit" className="btn btn-accent">
                  Confirm Booking
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
