import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/contacts', label: 'Support Messages' },
    { path: '/admin/bookings', label: 'Bookings' },
    { path: '/admin/menu', label: 'Menu Items' },
    { path: '/admin/staff', label: 'Staff' },
    { path: '/admin/reviews', label: 'Reviews' }
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = () => {
    // Only close sidebar on mobile screens
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => {
            if (window.innerWidth <= 768) setSidebarOpen(false);
            handleLogout();
          }}>
            {sidebarOpen ? 'Logout' : 'Exit'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="admin-header">
          <div className="header-left">
            <button 
              className="mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <span className="user-info">
              {JSON.parse(localStorage.getItem('user') || '{}').email}
            </span>
          </div>
        </div>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
