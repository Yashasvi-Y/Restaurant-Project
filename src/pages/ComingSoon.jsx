import './ComingSoon.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 

export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <div className="coming-inner">
        <h1 className="brand">INDRIYA</h1>
        <h2>We're cooking something amazing 🍽️</h2>
        <p>Our new feature is almost ready to serve.<br></br> Stay tuned!</p>
        <Link to="/" className="btn"><FaArrowLeft /> <span>Back to Home</span></Link>
      </div>
    </div>
  );
}