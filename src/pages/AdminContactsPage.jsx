import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';
import './AdminContactsPage.css';

const AdminContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('new');
  const [statusCounts, setStatusCounts] = useState({ new: 0, read: 0, replied: 0 });

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch all contacts to get counts
      const allResponse = await apiGet('/contact');

      if (allResponse.ok) {
        const allData = await allResponse.json();
        const allContacts = allData.contacts || [];
        
        // Count by status
        const counts = {
          new: allContacts.filter(c => c.status === 'new').length,
          read: allContacts.filter(c => c.status === 'read').length,
          replied: allContacts.filter(c => c.status === 'replied').length
        };
        setStatusCounts(counts);
      }
      
      // Fetch filtered contacts
      const response = await apiGet(`/contact?status=${statusFilter}`);

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      } else {
        setError('Failed to load contacts');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSelectContact = async (contact) => {
    try {
      const response = await apiGet(`/contact/${contact._id}`);

      if (response.ok) {
        const data = await response.json();
        setSelectedContact(data.contact);
        setReplyText('');
      }
    } catch (err) {
      console.error('Error fetching contact:', err);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      alert('Please type a reply message');
      return;
    }

    setReplyLoading(true);
    try {
      const response = await apiPost(
        `/contact/${selectedContact._id}/reply`,
        { replyMessage: replyText }
      );

      if (response.ok) {
        alert('Reply sent successfully!');
        setSelectedContact(null);
        setReplyText('');
        fetchContacts();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to send reply');
      }
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Error sending reply');
    } finally {
      setReplyLoading(false);
    }
  };

  const handleChangeStatus = async (contactId, newStatus) => {
    try {
      const response = await apiPut(`/contact/${contactId}`, { status: newStatus });

      if (response.ok) {
        fetchContacts();
        if (selectedContact?._id === contactId) {
          setSelectedContact(null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await apiDelete(`/contact/${contactId}`);

      if (response.ok) {
        fetchContacts();
        if (selectedContact?._id === contactId) {
          setSelectedContact(null);
        }
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-contacts-page">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/admin')}>← Back</button>
          <h2>Support Messages 💬</h2>
        </div>

        <div className="contacts-container">
          {/* Left: Messages List */}
          <div className="contacts-list-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${statusFilter === 'new' ? 'active' : ''}`}
                onClick={() => setStatusFilter('new')}
              >
                🔴 New ({statusCounts.new})
              </button>
              <button
                className={`filter-btn ${statusFilter === 'read' ? 'active' : ''}`}
                onClick={() => setStatusFilter('read')}
              >
                🟡 Read ({statusCounts.read})
              </button>
              <button
                className={`filter-btn ${statusFilter === 'replied' ? 'active' : ''}`}
                onClick={() => setStatusFilter('replied')}
              >
                🟢 Replied ({statusCounts.replied})
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading messages...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : contacts.length === 0 ? (
              <div className="empty-state">
                <p>📭 No {statusFilter} messages</p>
              </div>
            ) : (
              <div className="messages-list">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`message-item ${
                      selectedContact?._id === contact._id ? 'selected' : ''
                    }`}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="message-header">
                      <h4>{contact.name}</h4>
                      <span className="message-date">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="message-preview">{contact.subject}</p>
                    <p className="message-text">{contact.message.substring(0, 60)}...</p>
                    <span className={`status-badge status-${contact.status}`}>
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Message Details & Reply */}
          <div className="contact-detail-section">
            {selectedContact ? (
              <div className="contact-detail">
                <div className="detail-header">
                  <h3>{selectedContact.name}</h3>
                  <button
                    className="close-btn"
                    onClick={() => setSelectedContact(null)}
                  >
                    ✕
                  </button>
                </div>

                <div className="contact-info">
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{selectedContact.phone}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Subject:</span>
                    <span className="info-value">{selectedContact.subject}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="message-body">
                  <h4>Message</h4>
                  <p>{selectedContact.message}</p>
                </div>

                {selectedContact.adminNotes && (
                  <div className="admin-notes">
                    <h4>Admin Notes</h4>
                    <p>{selectedContact.adminNotes}</p>
                  </div>
                )}

                {selectedContact.status !== 'replied' && (
                  <div className="reply-section">
                    <h4>Send Reply</h4>
                    <textarea
                      className="reply-textarea"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows="6"
                    ></textarea>
                    <div className="reply-actions">
                      <button
                        className="btn btn-send-reply"
                        onClick={handleSendReply}
                        disabled={replyLoading || !replyText.trim()}
                      >
                        {replyLoading ? 'Sending...' : '📧 Send Reply'}
                      </button>
                      <button
                        className="btn btn-mark-read"
                        onClick={() =>
                          handleChangeStatus(selectedContact._id, 'read')
                        }
                      >
                        ✓ Mark as Read
                      </button>
                    </div>
                  </div>
                )}

                <div className="contact-actions">
                  <select
                    className="status-select"
                    value={selectedContact.status}
                    onChange={(e) =>
                      handleChangeStatus(selectedContact._id, e.target.value)
                    }
                  >
                    <option value="new">🔴 New</option>
                    <option value="read">🟡 Read</option>
                    <option value="replied">🟢 Replied</option>
                    <option value="archived">⚫ Archived</option>
                  </select>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteContact(selectedContact._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-detail">
                <p>👈 Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContactsPage;
