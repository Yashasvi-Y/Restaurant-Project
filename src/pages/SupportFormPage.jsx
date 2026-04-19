import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';
import './SupportFormPage.css';

const SupportFormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Please enter your name';
        if (!formData.email.trim()) return 'Please enter your email';
        if (!formData.email.includes('@')) return 'Please enter a valid email';
        if (!formData.subject.trim()) return 'Please enter a subject';
        if (!formData.message.trim()) return 'Please enter your message';
        if (formData.message.length < 10) return 'Message must be at least 10 characters';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await apiPost('/contact', formData);

            if (response.ok) {
                setSuccessMessage('Thank you! We received your message. Our team will get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                
                // Redirect to home after 2 seconds
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="support-form-page">
            <div className="support-form-container">
                <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
                <div className="form-header">
                    <h1>Get In Touch With Us</h1>
                    <p>Have a question or feedback? We'd love to hear from you.</p>
                </div>

                <div className="form-content">
                    <div className="contact-info">
                        <h3>Contact Information</h3>

                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <p>support@restaurant.com</p>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Location:</span>
                            <p>123 Fine Dining Street<br/>Culinary City, CC 12345</p>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Hours:</span>
                            <p>Mon - Thu: 11:30 AM - 9:00 PM<br/>
                               Fri - Sat: 11:30 AM - 10:00 PM<br/>
                               Sun: 11:30 AM - 9:00 PM</p>
                        </div>
                    </div>

                    <form className="support-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Please describe your inquiry or feedback..."
                                rows="6"
                                required
                            ></textarea>
                            <small>{formData.message.length}/500 characters</small>
                        </div>

                        {errorMessage && (
                            <div className="message error-message">
                                ⚠️ {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="message success-message">
                                ✓ {successMessage}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-accent"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupportFormPage;
