import { useLocation, Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa'; 
import Navbar from '../Navbar/Navbar';
import images from '../../constants/images';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  return (
    <header className="header flex" id="header">
      {!isMenuPage && <Navbar />}

      <div className="container">
        <div className="header-content grid text-center py-6 text-white">
          <div className="header-content-left" data-aos="fade-right">
            <h1 className="text-upper header-title">Indriya</h1>
            <p className="text">
              Welcome to Indriya, where every meal is a celebration of flavors and tradition. Embark on a culinary journey that excites your palate and soothes your soul. Join us for exceptional food, attentive service, and an ambiance that makes every visit truly special.
            </p>

            {isMenuPage ? (
              <Link to="/" className="btn btn-dark">
                <FaArrowLeft /> <span>Back to Home</span>
              </Link>
            ) : (
              <a href="#what-we-offer" className="btn btn-dark">
                <span>Explore</span> <FaRegPaperPlane />
              </a>
            )}
          </div>

          <div className="header-content-right" data-aos="fade-left">
            <img src={images.header_image} alt="Restaurant" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
