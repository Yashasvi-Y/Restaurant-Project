import { useState } from "react";
import images from "../../constants/images";
import"./Navbar.css"; 
import {FaBars, FaTimes} from "react-icons/fa";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const close = () => setClick(false);

    return(
        <nav className="navbar">
            <div className="container flex navbar-content">
                <div className="brand-and-toggler flex">
                    <a href="index.html" alt="" className="navbar-brand text-upper fw-7 fs-22 flex">
                        <span className="text-white">INDRIYA</span>
                    </a>
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
                            <a href="#header" className="nav-link">what we offer</a>
                        </li>
                        <li className="nav-item">
                            <a href="#header" className="nav-link">menu</a>
                        </li>
                        <li className="nav-item">
                            <a href="#header" className="nav-link">dining Experiences</a>
                        </li>
                        <li className="nav-item">
                            <a href="#header" className="nav-link">Gallery</a>
                        </li>
                        <li className="nav-item">
                            <a href="#header" className="nav-link">team</a>
                        </li>
                        <li className="nav-item">
                            <a href="#header" className="nav-link">support</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;                            