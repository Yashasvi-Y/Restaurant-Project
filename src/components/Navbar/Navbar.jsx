import { useState, useEffect } from "react";
import "./Navbar.css"; 
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [ click, setClick ] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = () => setClick(!click);
    const close = () => setClick(false);
    
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
    
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
      setShowDropdown(false);
      close();
    };
    
    return(
        <nav className="navbar">
            <div className="container flex navbar-content">
                <div className="brand-and-toggler flex">
                    <a href="#header" className="navbar-brand text-upper fw-7 fs-22 flex"><span className="text-white">INDRIYA</span></a>
                    <button type="button" className="navbar-show-btn text-white" onClick={() => handleClick()}>
                        <FaBars size={26}/>
                    </button>
                </div>
                <div className={`navbar-collapse flex flex-center ${click ? "show-navbar" :"" }`}>
                    <button type="button" className="navbar-hide-btn text-white" onClick={() => close()}><FaTimes size={32}/></button>
                    <ul className="navbar-nav text-upper text-white fw-6 ls-1 fs-20 text-center">
                        <li className="nav-item">
                            <a href="#header" className="nav-link">home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#what-we-offer" className="nav-link">what we offer</a>
                        </li>
                        <li className="nav-item">
                            <a href="#menu" className="nav-link">menu</a>
                        </li>
                        <li className="nav-item">
                            <a href="#dining-experience" className="nav-link">dining Experiences</a>
                        </li>
                        <li className="nav-item">
                            <a href="#gallery" className="nav-link">Gallery</a>
                        </li>
                        <li className="nav-item">
                            <a href="#team" className="nav-link">team</a>
                        </li>
                        {user ? (
                          <li className="nav-item dropdown">
                            <button 
                              className="nav-link dropdown-btn"
                              onClick={() => setShowDropdown(!showDropdown)}
                              style={{background: 'none', border: 'none', cursor: 'pointer'}}
                            >
                              {user.name || user.email} ▼
                            </button>
                            {showDropdown && (
                              <div className="dropdown-menu">
                                {user.role === 'admin' && (
                                  <Link to="/admin" className="dropdown-item admin-link" onClick={() => { setShowDropdown(false); close(); }}>
                                    📊 Admin Dashboard
                                  </Link>
                                )}
                                <Link to="/account" className="dropdown-item" onClick={() => { setShowDropdown(false); close(); }}>
                                  My Account
                                </Link>
                                <button 
                                  onClick={handleLogout}
                                  className="dropdown-item logout-btn"
                                >
                                  Logout
                                </button>
                              </div>
                            )}
                          </li>
                        ) : (
                          <>
                            <li className="nav-item">
                              <Link to="/login" className="nav-link">login</Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/register" className="nav-link">register</Link>
                            </li>
                          </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;                            