import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet } from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    bookings: 0,
    contacts: { new: 0, read: 0, replied: 0, total: 0 },
    pendingReviews: 0,
    menuItems: 0,
    staff: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch contact stats
        const contactRes = await apiGet('/contact/admin/stats');
        const contactData = contactRes.ok ? await contactRes.json() : { stats: {} };

        // Fetch bookings (admin endpoint)
        const bookingsRes = await apiGet('/bookings/admin/all');
        const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];

        // Fetch menu items
        const menuRes = await apiGet('/menu');
        const menuData = menuRes.ok ? await menuRes.json() : [];

        // Fetch staff
        const staffRes = await apiGet('/staff');
        const staffData = staffRes.ok ? await staffRes.json() : [];

        // Fetch reviews (pending approval)
        const reviewsRes = await apiGet('/reviews');
        const reviewsData = reviewsRes.ok ? await reviewsRes.json() : [];
        const pendingReviews = Array.isArray(reviewsData)
          ? reviewsData.filter((r) => !r.isApproved).length
          : 0;

        setStats({
          bookings: Array.isArray(bookingsData) ? bookingsData.length : 0,
          contacts: contactData.stats || { new: 0, read: 0, replied: 0, total: 0 },
          pendingReviews,
          menuItems: Array.isArray(menuData) ? menuData.length : 0,
          staff: Array.isArray(staffData) ? staffData.length : 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
          <h2>Welcome, Admin</h2>
        </div>
        <p className="subtitle">Here's an overview of your restaurant</p>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          {/* Total Bookings */}
          <div className="stat-card booking-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Bookings</h3>
              <p className="stat-number">{stats.bookings}</p>
              <small>Active reservations</small>
            </div>
          </div>

          {/* New Support Messages */}
          <div className="stat-card contact-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Support Messages</h3>
              <p className="stat-number">{stats.contacts.new}</p>
              <small>{stats.contacts.new} new message{stats.contacts.new !== 1 ? 's' : ''}</small>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="stat-card review-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Pending Reviews</h3>
              <p className="stat-number">{stats.pendingReviews}</p>
              <small>Awaiting approval</small>
            </div>
          </div>

          {/* Menu Items */}
          <div className="stat-card menu-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Menu Items</h3>
              <p className="stat-number">{stats.menuItems}</p>
              <small>Active items</small>
            </div>
          </div>

          {/* Staff Members */}
          <div className="stat-card staff-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Staff Members</h3>
              <p className="stat-number">{stats.staff}</p>
              <small>Team size</small>
            </div>
          </div>

          {/* Contact Status Breakdown */}
          <div className="stat-card status-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Message Status</h3>
              <p className="stat-number">{stats.contacts.total}</p>
              <small>Total messages</small>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <a href="/admin/contacts" className="action-btn contacts-btn">
              Check Support Messages
            </a>
            <a href="/admin/bookings" className="action-btn bookings-btn">
              Manage Bookings
            </a>
            <a href="/admin/reviews" className="action-btn reviews-btn">
              Approve Reviews
            </a>
            <a href="/admin/menu" className="action-btn menu-btn">
              Edit Menu
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
