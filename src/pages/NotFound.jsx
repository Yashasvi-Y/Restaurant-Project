import { Link } from 'react-router-dom';
import './NotFound.css';
import { FaArrowLeft } from 'react-icons/fa'; 

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-box">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn"><FaArrowLeft /> <span>Back to Home</span></Link>
      </div>
    </div>
  );
}