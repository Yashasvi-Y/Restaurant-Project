import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import './SeasonalSpecials.css';

const SeasonalSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSpecials();
  }, []);

  useEffect(() => {
    if (specials.length === 0) return;

    // Auto-rotate carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [specials]);

  const fetchSpecials = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAllItems({ isSpecial: 'true' });
      setSpecials(response.data);
    } catch (err) {
      setError('Failed to load seasonal specials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + specials.length) % specials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % specials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return <div className="seasonal-loading">Loading specials...</div>;
  }

  if (error || specials.length === 0) {
    return null; // Don't show if no specials
  }

  const currentSpecial = specials[currentIndex];

  return (
    <section className="seasonal-specials">
      <div className="seasonal-header">
        <h2>🎪 Chef's Seasonal Specials</h2>
        <p>Limited time dishes crafted with our finest ingredients</p>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={goToPrevious} aria-label="Previous">
            ❮
          </button>

          <div className="carousel-slide">
            <div className="slide-content">
              <div className="slide-image">
                {currentSpecial.image ? (
                  <img src={currentSpecial.image} alt={currentSpecial.name} />
                ) : (
                  <div className="image-placeholder">🍽️</div>
                )}
              </div>

              <div className="slide-info">
                <div className="badge">{currentSpecial.specialBadge || 'Chef\'s Special'}</div>
                <h3>{currentSpecial.name}</h3>
                <p className="description">{currentSpecial.description}</p>

                <div className="details">
                  <span className="price">₹{currentSpecial.price}</span>
                  {currentSpecial.dietaryTags && currentSpecial.dietaryTags.length > 0 && (
                    <div className="tags">
                      {currentSpecial.dietaryTags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <button className="btn-order">Order Now</button>
              </div>
            </div>
          </div>

          <button className="carousel-btn next" onClick={goToNext} aria-label="Next">
            ❯
          </button>
        </div>

        {/* Dots indicator */}
        <div className="carousel-dots">
          {specials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalSpecials;
