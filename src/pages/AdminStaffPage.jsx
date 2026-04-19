import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';
import './AdminStaffPage.css';

const AdminStaffPage = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    specialty: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await apiGet('/staff');
      if (response.ok) {
        const data = await response.json();
        setStaffData(data || []);
      } else {
        setError('Failed to load staff');
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Error fetching staff');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', position: '', specialty: '', phone: '', email: '' });
    setShowForm(true);
  };

  const handleEditClick = (member) => {
    setEditingId(member._id);
    setFormData({
      name: member.name,
      position: member.role,
      specialty: member.speciality || member.specialty || '',
      phone: member.phone || '',
      email: member.email || ''
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map frontend form data to backend field names
      const backendData = {
        name: formData.name,
        role: formData.position,
        speciality: formData.specialty,
        phone: formData.phone,
        email: formData.email
      };
      
      const response = editingId
        ? await apiPut(`/staff/${editingId}`, backendData)
        : await apiPost('/staff', backendData);

      if (response.ok) {
        setShowForm(false);
        fetchStaff();
      } else {
        setError('Failed to save staff member');
      }
    } catch (err) {
      console.error('Error saving staff member:', err);
      setError('Error saving staff member');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    
    try {
      const response = await apiDelete(`/staff/${id}`);

      if (response.ok) {
        fetchStaff();
      } else {
        setError('Failed to delete staff member');
      }
    } catch (err) {
      console.error('Error deleting staff member:', err);
      setError('Error deleting staff member');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-staff-page">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/admin')}>← Back</button>
          <h2>Manage Staff</h2>
          <button className="btn-add" onClick={handleAddClick}>+ Add Member</button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
              <h3>{editingId ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Chef">Chef</option>
                  <option value="Sommelier">Sommelier</option>
                  <option value="Manager">Manager</option>
                  <option value="Barista">Barista</option>
                  <option value="Staff">Staff</option>
                </select>
                <input
                  type="text"
                  name="specialty"
                  placeholder="Specialty/Expertise"
                  value={formData.specialty}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="form-buttons">
                  <button type="submit" className="btn-save">Save</button>
                  <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading staff...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : staffData.length === 0 ? (
          <div className="empty-state">
            <p>No staff members found</p>
          </div>
        ) : (
          <div className="staff-grid">
            {staffData.map((member) => (
              <div key={member._id} className="staff-card">
                <div className="staff-avatar">👤</div>
                <h3>{member.name}</h3>
                <p className="position">{member.role}</p>
                <p className="specialty">{member.speciality || member.specialty}</p>
                <div className="staff-info">
                  {member.phone && <p>{member.phone}</p>}
                  {member.email && <p>{member.email}</p>}
                </div>
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => handleEditClick(member)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(member._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStaffPage;
