import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet, apiPut } from '../utils/api';
import './AdminBookingsPage.css';

const AdminBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchBookings();
    
    // Auto-complete bookings 120 mins after reservation time
    const autoCompleteInterval = setInterval(() => {
      setBookings(prevBookings => {
        const updatedBookings = prevBookings.map(booking => {
          // Skip if already completed or cancelled
          if (booking.status === 'completed' || booking.status === 'cancelled') {
            return booking;
          }
          
          // Check if booking is past and 120+ mins have elapsed
          const reservationDateTime = new Date(booking.reservationDate);
          const [hours, minutes] = booking.reservationTime.split(':');
          reservationDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          const endTime = new Date(reservationDateTime.getTime() + 120 * 60 * 1000); // 120 mins later
          const now = new Date();
          
          if (now > endTime && getStatusColor(booking.reservationDate) === 'past') {
            // Auto-update to completed
            autoUpdateBookingStatus(booking._id, 'completed');
            return { ...booking, status: 'completed' };
          }
          
          return booking;
        });
        return updatedBookings;
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(autoCompleteInterval);
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await apiGet('/bookings/admin/all');

      if (response.ok) {
        const data = await response.json();
        setBookings(data || []);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today ? 'upcoming' : 'past';
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleEditClick = (booking) => {
    setEditingBooking({
      ...booking,
      status: booking.status || 'confirmed'
    });
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setEditingBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveBooking = async () => {
    try {
      const response = await apiPut(
        `/bookings/${editingBooking._id}/status`,
        { status: editingBooking.status }
      );

      if (response.ok) {
        setShowEditModal(false);
        fetchBookings();
      } else {
        setError('Failed to update booking');
      }
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Error updating booking');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const response = await apiPut(`/bookings/${bookingId}/cancel`, { cancelledBy: 'admin' });

      if (response.ok) {
        fetchBookings();
        setSelectedBooking(null);
        alert('Booking cancelled successfully');
      } else {
        setError('Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Error cancelling booking');
    }
  };

  const autoUpdateBookingStatus = async (bookingId, status) => {
    try {
      await apiPut(`/bookings/${bookingId}/status`, { status });
    } catch (err) {
      console.error('Error auto-updating booking status:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-bookings-page">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/admin')}>← Back</button>
          <h2>Manage Bookings</h2>
        </div>

        {loading ? (
          <div className="loading">Loading bookings...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Confirmation</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Party Size</th>
                  <th>Special Requests</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className={`booking-row ${getStatusColor(booking.reservationDate)}`}
                    onClick={() => handleViewBooking(booking)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="confirm-number">{booking.confirmationNumber}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{new Date(booking.reservationDate).toLocaleDateString()}</td>
                    <td>{booking.reservationTime}</td>
                    <td className="party-size">{booking.partySize} persons</td>
                    <td className="special-requests">
                      {booking.specialRequests || 'None'}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusColor(
                          booking.reservationDate
                        )}`}
                      >
                        {getStatusColor(booking.reservationDate) === 'upcoming'
                          ? 'Upcoming'
                          : 'Past'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="modal booking-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedBooking(null)}>×</button>
              <h3>Booking Details</h3>
              <div className="booking-details">
                <div className="detail-row">
                  <span className="label">Confirmation #:</span>
                  <span className="value">{selectedBooking.confirmationNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{selectedBooking.name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{selectedBooking.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="value">{selectedBooking.phone || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{new Date(selectedBooking.reservationDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Time:</span>
                  <span className="value">{selectedBooking.reservationTime}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Party Size:</span>
                  <span className="value">{selectedBooking.partySize} persons</span>
                </div>
                <div className="detail-row">
                  <span className="label">Special Requests:</span>
                  <span className="value">{selectedBooking.specialRequests || 'None'}</span>
                </div>
              </div>
              <div className="modal-actions">
                {getStatusColor(selectedBooking.reservationDate) === 'upcoming' && selectedBooking.status !== 'cancelled' ? (
                  <>
                    <button 
                      className="btn-edit" 
                      onClick={() => {
                        handleEditClick(selectedBooking);
                        setSelectedBooking(null);
                      }}
                    >
                      Edit Status
                    </button>
                    <button 
                      className="btn-cancel-booking" 
                      onClick={() => {
                        handleCancelBooking(selectedBooking._id);
                        setSelectedBooking(null);
                      }}
                    >
                      Cancel Booking
                    </button>
                  </>
                ) : (
                  <p className="info-text">This booking cannot be modified</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Booking Status Modal */}
        {showEditModal && editingBooking && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
              <h3>Edit Booking Status</h3>
              <div className="booking-edit-form">
                <div className="form-group">
                  <label>Booking Status:</label>
                  <select 
                    value={editingBooking.status} 
                    onChange={(e) => handleEditChange('status', e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Guest Name:</label>
                  <input 
                    type="text" 
                    value={editingBooking.name} 
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-actions">
                  <button className="btn-save" onClick={handleSaveBooking}>Save Changes</button>
                  <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookingsPage;
