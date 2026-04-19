import React, { useState, useEffect } from 'react';
import { reviewAPI } from '../services/api';
import './CustomerReviews.css';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getApprovedReviews();
      setReviews(response.data);
    } catch (err) {
      setError('Failed to load reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await reviewAPI.likeReview(reviewId);
      // Update the review count locally
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId ? { ...review, likes: review.likes + 1 } : review
        )
      );
    } catch (err) {
      console.error('Failed to like review:', err);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  if (loading) {
    return <div className="reviews-loading">Loading customer reviews...</div>;
  }

  if (error || reviews.length === 0) {
    return null;
  }

  return (
    <section className="customer-reviews">
      <div className="reviews-header">
        <h2>📸 Guest Experiences</h2>
        <p>Photos and reviews from our wonderful customers</p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="gallery-grid">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="gallery-item"
            onClick={() => setSelectedReview(review)}
          >
            <div className="photo-wrapper">
              <img
                src={review.photoUrl}
                alt={`Review by ${review.userId?.name}`}
                className="photo"
              />
              <div className="overlay">
                <div className="overlay-content">
                  <p className="view-more">View Details</p>
                </div>
              </div>
            </div>
            <div className="photo-info">
              <div className="rating">{renderStars(review.rating)}</div>
              <p className="reviewer">{review.userId?.name}</p>
              <button
                className="like-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(review._id);
                }}
              >
                👍 {review.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed review */}
      {selectedReview && (
        <div className="review-modal" onClick={() => setSelectedReview(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedReview(null)}
            >
              ✕
            </button>

            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedReview.photoUrl} alt="Review" />
              </div>

              <div className="modal-details">
                <div className="rating-large">
                  {renderStars(selectedReview.rating)}
                </div>

                <h3>{selectedReview.userId?.name}</h3>

                {selectedReview.comment && (
                  <p className="comment">{selectedReview.comment}</p>
                )}

                {selectedReview.menuItems && selectedReview.menuItems.length > 0 && (
                  <div className="menu-items">
                    <label>Dishes Ordered:</label>
                    {selectedReview.menuItems.map((item, idx) => (
                      <span key={idx} className="item-tag">
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="modal-footer">
                  <p className="visit-date">
                    📅 {new Date(selectedReview.visitDate).toLocaleDateString()}
                  </p>
                  <button className="like-btn-large" onClick={() => {
                    handleLike(selectedReview._id);
                    setReviews((prev) =>
                      prev.map((review) =>
                        review._id === selectedReview._id
                          ? { ...review, likes: review.likes + 1 }
                          : review
                      )
                    );
                  }}>
                    👍 {selectedReview.likes} Likes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviews;
