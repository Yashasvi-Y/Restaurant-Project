import React, { useState, useEffect } from 'react';
import { staffAPI } from '../services/api';
import './StaffSpotlight.css';

const StaffSpotlight = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getAllStaff();
      setStaffMembers(response.data);
    } catch (err) {
      setError('Failed to load staff members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return <div className="staff-loading">Loading our team...</div>;
  }

  if (error || staffMembers.length === 0) {
    return null;
  }

  return (
    <section className="staff-spotlight">
      <div className="spotlight-header">
        <h2>👨‍🍳 Meet Our Team</h2>
        <p>Passionate culinary professionals dedicated to your dining experience</p>
      </div>

      <div className="staff-grid">
        {staffMembers.map((staff) => (
          <div
            key={staff._id}
            className={`staff-card ${flipped[staff._id] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(staff._id)}
          >
            {/* Front of card */}
            <div className="card-front">
              <div className="staff-image">
                {staff.image ? (
                  <img src={staff.image} alt={staff.name} />
                ) : (
                  <div className="image-placeholder">👨‍🍳</div>
                )}
              </div>
              <div className="staff-name">{staff.name}</div>
              <div className="staff-role">{staff.role}</div>
              <div className="staff-speciality">{staff.speciality}</div>
              <p className="flip-hint">Click to learn more</p>
            </div>

            {/* Back of card */}
            <div className="card-back">
              <div className="back-content">
                <h4>{staff.name}</h4>

                {staff.experienceYears > 0 && (
                  <p className="bio-item">
                    <span className="label">Experience:</span> {staff.experienceYears} years
                  </p>
                )}

                {staff.bio && (
                  <p className="bio-item">
                    <span className="label">Bio:</span> {staff.bio}
                  </p>
                )}

                {staff.certifications && staff.certifications.length > 0 && (
                  <div className="bio-item">
                    <span className="label">Certifications:</span>
                    <ul>
                      {staff.certifications.map((cert, idx) => (
                        <li key={idx}>✓ {cert}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {staff.highlights && staff.highlights.length > 0 && (
                  <div className="bio-item">
                    <span className="label">Highlights:</span>
                    <div className="highlights">
                      {staff.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-badge">
                          ⭐ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {staff.socialLinks && Object.values(staff.socialLinks).some(link => link) && (
                  <div className="social-links">
                    {staff.socialLinks.instagram && (
                      <a href={staff.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                        📷
                      </a>
                    )}
                    {staff.socialLinks.twitter && (
                      <a href={staff.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                        🐦
                      </a>
                    )}
                    {staff.socialLinks.linkedin && (
                      <a href={staff.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        💼
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffSpotlight;
