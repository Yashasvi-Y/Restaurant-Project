import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiDelete } from '../utils/api';
import './UserAccount.css';

const UserAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewingBookingId, setReviewingBookingId] = useState(null);
  const [reviewedBookingIds, setReviewedBookingIds] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/register');
      return;
    }
    setUser(JSON.parse(storedUser));
    
    // Fetch user's bookings
    const fetchBookings = async () => {
      try {
        const response = await apiGet('/bookings');
        
        if (response.ok) {
          const data = await response.json();
          
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          // 1. Upcoming confirmed/pending first
          const upcoming = data
            .filter(
              b =>
                new Date(b.reservationDate) >= now &&
                !['completed', 'cancelled'].includes(b.status)
            )
            .sort(
              (a, b) =>
                new Date(a.reservationDate) - new Date(b.reservationDate)
            );
          
          // 2. Completed / Cancelled after that
          const finished = data
            .filter(b => ['completed', 'cancelled'].includes(b.status))
            .sort(
              (a, b) =>
                new Date(b.reservationDate) - new Date(a.reservationDate)
            );
          
          // 3. Past confirmed bookings (if any left)
          const past = data
            .filter(
              b =>
                new Date(b.reservationDate) < now &&
                !['completed', 'cancelled'].includes(b.status)
            )
            .sort(
              (a, b) =>
                new Date(b.reservationDate) - new Date(a.reservationDate)
            );
          
          setBookings([...upcoming, ...finished, ...past]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    
    // Fetch user's reviews to check which bookings are already reviewed
    const fetchUserReviews = async () => {
      try {
        const response = await apiGet('/reviews/user/my-reviews');
        
        if (response.ok) {
          const data = await response.json();
          // Extract bookingIds from reviews
          const reviewedIds = data
            .filter(review => review.bookingId && review.bookingId._id)
            .map(review => review.bookingId._id);
          setReviewedBookingIds(reviewedIds);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    
    fetchBookings();
    fetchUserReviews();
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const response = await apiDelete(`/bookings/${bookingId}`);

      if (response.ok) {
        // Refresh bookings
        const bookingsRes = await apiGet('/bookings');
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          // 1. Upcoming confirmed/pending first
          const upcoming = data
            .filter(
              b =>
                new Date(b.reservationDate) >= now &&
                !['completed', 'cancelled'].includes(b.status)
            )
            .sort(
              (a, b) =>
                new Date(a.reservationDate) - new Date(b.reservationDate)
            );
          
          // 2. Completed / Cancelled after that
          const finished = data
            .filter(b => ['completed', 'cancelled'].includes(b.status))
            .sort(
              (a, b) =>
                new Date(b.reservationDate) - new Date(a.reservationDate)
            );
          
          // 3. Past confirmed bookings (if any left)
          const past = data
            .filter(
              b =>
                new Date(b.reservationDate) < now &&
                !['completed', 'cancelled'].includes(b.status)
            )
            .sort(
              (a, b) =>
                new Date(b.reservationDate) - new Date(a.reservationDate)
            );
          
          setBookings([...upcoming, ...finished, ...past]);
        }
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking');
    }
  };

  const handleSubmitReview = async (bookingId) => {
    if (!reviewForm.comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      const response = await apiPost('/reviews', {
        bookingId,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setReviewingBookingId(null);
        setReviewForm({ rating: 5, comment: '' });
        setReviewedBookingIds([...reviewedBookingIds, bookingId]);
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="user-account-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>My Account</h1>
        
        <div className="account-grid">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-card">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <label>Name:</label>
                  <p>{user?.name || 'Not set'}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button className="btn btn-danger btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bookings-section">
            <div className="bookings-card">
              <h2>My Bookings</h2>
              {bookings.length === 0 ? (
                <p className="no-bookings">No bookings yet. <a href="/">Make a reservation</a></p>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="booking-item">
                      <p><strong>Date:</strong> {new Date(booking.reservationDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {booking.reservationTime}</p>
                      <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                      <p><strong>Status:</strong> <span className={`status-badge ${booking.status}`}>{booking.status}</span>{booking.status === 'completed' && reviewedBookingIds.includes(booking._id) && <span className="status-badge reviewed-badge">Reviewed</span>}</p>
                      
                      <div className="booking-actions">
                        {booking.status === 'confirmed' && (
                          <button 
                            className="btn btn-small btn-cancel"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>

                      {booking.status === 'completed' && (
                        <div className="review-section">
                          {reviewingBookingId === booking._id ? (
                            <div className="review-form">
                              <h4>Leave a Review</h4>
                              <div className="form-group">
                                <label>Rating:</label>
                                <select 
                                  value={reviewForm.rating} 
                                  onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                                >
                                  <option value="1">1 - Poor</option>
                                  <option value="2">2 - Fair</option>
                                  <option value="3">3 - Good</option>
                                  <option value="4">4 - Very Good</option>
                                  <option value="5">5 - Excellent</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Comment:</label>
                                <textarea 
                                  value={reviewForm.comment}
                                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                                  placeholder="Share your experience..."
                                  rows="4"
                                ></textarea>
                              </div>
                              <div className="review-actions">
                                <button 
                                  className="btn btn-small btn-submit"
                                  onClick={() => handleSubmitReview(booking._id)}
                                >
                                  Submit Review
                                </button>
                                <button 
                                  className="btn btn-small btn-cancel"
                                  onClick={() => setReviewingBookingId(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : !reviewedBookingIds.includes(booking._id) && (
                            <button 
                              className="btn btn-small btn-review"
                              onClick={() => setReviewingBookingId(booking._id)}
                            >
                              Write a Review
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <button className="btn btn-secondary" onClick={() => navigate('/booking')}>Make New Booking</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
