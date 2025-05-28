import { useState } from "react";
import"./Navbar.css"; 
import {FaBars, FaTimes} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const close = () => setClick(false);

        const location = useLocation();

    // Handles "home" click
    const handleHomeClick = (e) => {
        if (location.pathname === "/") {
            // Already on homepage: scroll to header (or top)
            e.preventDefault();
            setClick(false); // close mobile menu if open
            const header = document.getElementById("header");
            if (header) {
                header.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // Navigating to homepage, close menu
            setClick(false);
        }
    };

    return(
        <nav className="navbar">
            <div className="container flex navbar-content">
                <div className="brand-and-toggler flex">
                    <Link to="/" className="navbar-brand text-upper fw-7 fs-22 flex"><span className="text-white">INDRIYA</span></Link>
                    <button type="button" className="navbar-show-btn text-white" onClick={() => handleClick()}>
                        <FaBars size={26}/>
                    </button>
                </div>
                <div className={`navbar-collapse flex flex-center ${click ? "show-navbar" :"" }`}>
                    <button type="button" className="navbar-hide-btn text-white" onClick={() => close()}><FaTimes size={32}/></button>
                    <ul className="navbar-nav text-upper text-white fw-6 ls-1 fs-20 text-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleHomeClick}>home</Link>
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
                        <li className="nav-item">
                            <a href="#support" className="nav-link">support</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;                            