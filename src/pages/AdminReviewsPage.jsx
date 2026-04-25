import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet, apiPut, apiDelete } from '../utils/api';
import './AdminReviewsPage.css';

const AdminReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await apiGet('/reviews/admin/all');

      if (response.ok) {
        const data = await response.json();
        setReviews(data || []);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      const response = await apiPut(`/reviews/${reviewId}/approve`, {});

      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error('Error approving review:', err);
    }
  };

  const handleRejectReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to reject this review?')) return;

    try {
      const response = await apiDelete(`/reviews/${reviewId}/reject`);

      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error('Error rejecting review:', err);
    }
  };

  const filteredReviews =
    filter === 'pending'
      ? reviews.filter((r) => !r.isApproved)
      : reviews.filter((r) => r.isApproved);

  return (
    <AdminLayout>
      <div className="admin-reviews-page">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/admin')}>← Back</button>
          <h2>Manage Reviews</h2>
        </div>

        <div className="filter-tabs">
          <button
            className={`tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({reviews.filter((r) => !r.isApproved).length})
          </button>
          <button
            className={`tab ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved ({reviews.filter((r) => r.isApproved).length})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading reviews...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredReviews.length === 0 ? (
          <div className="empty-state">
            <p>No {filter} reviews</p>
          </div>
        ) : (
          <div className="reviews-list">
            {filteredReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>{review.userId?.name || 'Anonymous'}</h4>
                    <div className="rating">
                      {'★ '.repeat(review.rating)}{' '}
                      <span className="rating-number">({review.rating}/5)</span>
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="review-comment">{review.comment}</p>

                {filter === 'pending' && (
                  <div className="review-actions">
                    <button
                      className="btn btn-approve"
                      onClick={() => handleApproveReview(review._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleRejectReview(review._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;
