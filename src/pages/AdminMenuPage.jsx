import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';
import './AdminMenuPage.css';

const AdminMenuPage = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    allergens: '',
    dietaryTags: ''
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await apiGet('/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data || []);
      } else {
        setError('Failed to load menu items');
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', description: '', price: '', allergens: '', dietaryTags: '' });
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      allergens: item.allergens ? item.allergens.join(', ') : '',
      dietaryTags: item.dietaryTags ? item.dietaryTags.join(', ') : ''
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
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        allergens: formData.allergens ? formData.allergens.split(',').map(a => a.trim()) : [],
        dietaryTags: formData.dietaryTags ? formData.dietaryTags.split(',').map(d => d.trim()) : []
      };

      const response = editingId
        ? await apiPut(`/menu/${editingId}`, payload)
        : await apiPost('/menu', payload);

      if (response.ok) {
        setShowForm(false);
        fetchMenuItems();
      } else {
        setError('Failed to save menu item');
      }
    } catch (err) {
      console.error('Error saving menu item:', err);
      setError('Error saving menu item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await apiDelete(`/menu/${id}`);

      if (response.ok) {
        fetchMenuItems();
      } else {
        setError('Failed to delete menu item');
      }
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError('Error deleting menu item');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-menu-page">
        <div className="page-header-admin">
          <button className="btn-back" onClick={() => navigate('/admin')}>← Back</button>
          <h2>Manage Menu Items</h2>
          <button className="btn-add" onClick={handleAddClick}>+ Add Item</button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
              <h3>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category (e.g., Appetizer, Main, Dessert)"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
                <input
                  type="text"
                  name="allergens"
                  placeholder="Allergens (comma-separated, e.g., nuts, dairy)"
                  value={formData.allergens}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="dietaryTags"
                  placeholder="Dietary Tags (comma-separated, e.g., vegan, gluten-free)"
                  value={formData.dietaryTags}
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
          <div className="loading">Loading menu items...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : menuItems.length === 0 ? (
          <div className="empty-state">
            <p>📭 No menu items found</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item._id} className="menu-card">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="description">{item.description}</p>
                <div className="item-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <div className="tags">
                    {item.allergens && item.allergens.length > 0 && (
                      <span className="tag allergen">🚨 {item.allergens.join(', ')}</span>
                    )}
                    {item.dietaryTags && item.dietaryTags.length > 0 && (
                      <span className="tag dietary">🌱 {item.dietaryTags.join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMenuPage;
