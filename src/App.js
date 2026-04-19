import './App.css';
import './assets/js/script';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import UserAccount from './pages/UserAccount';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import SupportFormPage from './pages/SupportFormPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminContactsPage from './pages/AdminContactsPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminStaffPage from './pages/AdminStaffPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/support-form" element={<SupportFormPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute>
              <AdminMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute>
              <AdminStaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminReviewsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
